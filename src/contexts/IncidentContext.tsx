import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

// Types
export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  assignee: string;
  createdAt: string;
  lastUpdate: string;
  description: string;
  affectedSystems: string[];
  estimatedImpact: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignee?: string;
  estimatedTime: string;
  dependencies?: string[];
}

interface IncidentState {
  incidents: Incident[];
  playbookSteps: PlaybookStep[];
  loading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    selectedSeverity: string;
    selectedStatus: string;
  };
}

// Actions
type IncidentAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_INCIDENTS'; payload: Incident[] }
  | { type: 'ADD_INCIDENT'; payload: Incident }
  | { type: 'UPDATE_INCIDENT'; payload: { id: string; updates: Partial<Incident> } }
  | { type: 'DELETE_INCIDENT'; payload: string }
  | { type: 'SET_PLAYBOOK_STEPS'; payload: PlaybookStep[] }
  | { type: 'TOGGLE_PLAYBOOK_STEP'; payload: string }
  | { type: 'UPDATE_FILTERS'; payload: Partial<IncidentState['filters']> }
  | { type: 'RESET_FILTERS' };

// Initial state
const initialState: IncidentState = {
  incidents: [
    {
      id: 'INC-2025-001',
      title: 'Ransomware Attack - Finance Department',
      severity: 'critical',
      status: 'investigating',
      assignee: 'Sarah Chen',
      createdAt: '2025-08-20T09:15:00Z',
      lastUpdate: '2025-08-20T14:30:00Z',
      description: 'Multiple workstations in finance showing ransomware encryption activity',
      affectedSystems: ['FIN-WS-001', 'FIN-WS-002', 'FIN-SERVER-01'],
      estimatedImpact: 'High - Financial operations disrupted'
    },
    {
      id: 'INC-2025-002',
      title: 'Phishing Campaign - Company-wide',
      severity: 'high',
      status: 'contained',
      assignee: 'Mike Johnson',
      createdAt: '2025-08-20T11:30:00Z',
      lastUpdate: '2025-08-20T13:45:00Z',
      description: 'Sophisticated phishing emails targeting employee credentials',
      affectedSystems: ['EMAIL-SYSTEM', 'AD-DOMAIN'],
      estimatedImpact: 'Medium - Potential credential compromise'
    }
  ],
  playbookSteps: [
    {
      id: 'STEP-001',
      title: 'Initial Assessment & Triage',
      description: 'Assess incident severity and assign initial response team',
      completed: true,
      assignee: 'Sarah Chen',
      estimatedTime: '15 minutes'
    },
    {
      id: 'STEP-002',
      title: 'Containment Actions',
      description: 'Isolate affected systems and prevent further spread',
      completed: true,
      assignee: 'Mike Johnson',
      estimatedTime: '30 minutes',
      dependencies: ['STEP-001']
    },
    {
      id: 'STEP-003',
      title: 'Evidence Collection',
      description: 'Collect forensic evidence and document affected systems',
      completed: false,
      assignee: 'Alex Rivera',
      estimatedTime: '60 minutes',
      dependencies: ['STEP-002']
    },
    {
      id: 'STEP-004',
      title: 'Stakeholder Notification',
      description: 'Notify relevant stakeholders and management',
      completed: false,
      estimatedTime: '20 minutes',
      dependencies: ['STEP-001']
    }
  ],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    selectedSeverity: 'all',
    selectedStatus: 'all'
  }
};

// Reducer
function incidentReducer(state: IncidentState, action: IncidentAction): IncidentState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload, loading: false, error: null };
    
    case 'ADD_INCIDENT':
      return { 
        ...state, 
        incidents: [action.payload, ...state.incidents],
        loading: false,
        error: null
      };
    
    case 'UPDATE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id
            ? { ...incident, ...action.payload.updates }
            : incident
        )
      };
    
    case 'DELETE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.filter(incident => incident.id !== action.payload)
      };
    
    case 'SET_PLAYBOOK_STEPS':
      return { ...state, playbookSteps: action.payload };
    
    case 'TOGGLE_PLAYBOOK_STEP':
      return {
        ...state,
        playbookSteps: state.playbookSteps.map(step =>
          step.id === action.payload
            ? { ...step, completed: !step.completed }
            : step
        )
      };
    
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters
      };
    
    default:
      return state;
  }
}

// Context
const IncidentContext = createContext<{
  state: IncidentState;
  dispatch: React.Dispatch<IncidentAction>;
  actions: {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addIncident: (incident: Incident) => void;
    updateIncident: (id: string, updates: Partial<Incident>) => void;
    deleteIncident: (id: string) => void;
    togglePlaybookStep: (stepId: string) => void;
    updateFilters: (filters: Partial<IncidentState['filters']>) => void;
    resetFilters: () => void;
  };
} | null>(null);

// Provider component
interface IncidentProviderProps {
  children: ReactNode;
}

export const IncidentProvider: React.FC<IncidentProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(incidentReducer, initialState);

  // Action creators
  const actions = {
    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    setError: useCallback((error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    }, []),

    addIncident: useCallback((incident: Incident) => {
      dispatch({ type: 'ADD_INCIDENT', payload: incident });
    }, []),

    updateIncident: useCallback((id: string, updates: Partial<Incident>) => {
      dispatch({ type: 'UPDATE_INCIDENT', payload: { id, updates } });
    }, []),

    deleteIncident: useCallback((id: string) => {
      dispatch({ type: 'DELETE_INCIDENT', payload: id });
    }, []),

    togglePlaybookStep: useCallback((stepId: string) => {
      dispatch({ type: 'TOGGLE_PLAYBOOK_STEP', payload: stepId });
    }, []),

    updateFilters: useCallback((filters: Partial<IncidentState['filters']>) => {
      dispatch({ type: 'UPDATE_FILTERS', payload: filters });
    }, []),

    resetFilters: useCallback(() => {
      dispatch({ type: 'RESET_FILTERS' });
    }, [])
  };

  return (
    <IncidentContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </IncidentContext.Provider>
  );
};

// Custom hook
export const useIncident = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
};

// Selectors (memoized)
export const useIncidentSelectors = () => {
  const { state } = useIncident();

  return {
    // Get filtered incidents based on current filters
    getFilteredIncidents: useCallback(() => {
      const { incidents, filters } = state;
      return incidents.filter(incident => {
        const matchesSearch = incident.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                             incident.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesSeverity = filters.selectedSeverity === 'all' || incident.severity === filters.selectedSeverity;
        const matchesStatus = filters.selectedStatus === 'all' || incident.status === filters.selectedStatus;
        return matchesSearch && matchesSeverity && matchesStatus;
      });
    }, [state]),

    // Get incident statistics
    getIncidentStats: useCallback(() => {
      const { incidents, playbookSteps } = state;
      const openIncidents = incidents.filter(inc => inc.status !== 'resolved');
      const criticalIncidents = incidents.filter(inc => inc.severity === 'critical');
      const activePlaybooks = playbookSteps.filter(step => !step.completed).length;
      
      return {
        open: openIncidents.length,
        critical: criticalIncidents.length,
        responders: 12, // This would come from API
        playbooks: activePlaybooks,
        mttr: '4.2h', // This would be calculated from historical data
        automation: '87%' // This would come from SOAR metrics
      };
    }, [state]),

    // Get playbook completion percentage
    getPlaybookProgress: useCallback(() => {
      const { playbookSteps } = state;
      const completed = playbookSteps.filter(step => step.completed).length;
      return Math.round((completed / playbookSteps.length) * 100);
    }, [state])
  };
};