// Enhanced type definitions with strict TypeScript and better organization

// Core severity and status types
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'active' | 'inactive' | 'pending' | 'resolved' | 'investigating';
export type Priority = 'urgent' | 'high' | 'normal' | 'low';

// Common interface patterns
export interface BaseEntity {
  readonly id: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface TimestampedEntity extends BaseEntity {
  readonly last_seen?: string;
  readonly closed_at?: string;
}

// Enhanced Asset interface with strict typing
export interface Asset extends TimestampedEntity {
  readonly name: string;
  readonly hostname: string;
  readonly type: AssetType;
  readonly operating_system: string;
  readonly ip_addresses: readonly string[];
  readonly criticality: Severity;
  readonly owner: string;
  readonly location: string;
  readonly status: Status;
  readonly tags: readonly string[];
  readonly metadata?: AssetMetadata;
}

export type AssetType = 'server' | 'workstation' | 'mobile_device' | 'network_device' | 'iot_device' | 'cloud_instance';

export interface AssetMetadata {
  readonly manufacturer?: string;
  readonly model?: string;
  readonly serial_number?: string;
  readonly installed_software?: readonly string[];
  readonly open_ports?: readonly number[];
  readonly vulnerabilities_count?: number;
  readonly incidents_count?: number;
  readonly alerts_count?: number;
}

// Enhanced Alert interface
export interface Alert extends TimestampedEntity {
  readonly title: string;
  readonly description: string;
  readonly severity: Severity;
  readonly status: AlertStatus;
  readonly source: string;
  readonly source_rule_id: string;
  readonly timestamp: string;
  readonly asset: AlertAsset;
  readonly mitre_attack: MitreAttack;
  readonly confidence: number;
  readonly assigned_to?: string;
  readonly escalated_to_incident: boolean;
  readonly incident_id?: string;
}

export type AlertStatus = 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'suppressed' | 'false_positive';

export interface AlertAsset {
  readonly id: string;
  readonly name: string;
  readonly hostname: string;
  readonly ip_address: string;
}

export interface MitreAttack {
  readonly tactics: readonly string[];
  readonly techniques: readonly string[];
  readonly technique_names: readonly string[];
}

// Enhanced Vulnerability interface
export interface Vulnerability extends TimestampedEntity {
  readonly cve_id: string;
  readonly title: string;
  readonly description: string;
  readonly severity: Severity;
  readonly cvss_score: number;
  readonly cvss_vector: string;
  readonly status: VulnerabilityStatus;
  readonly discovered_date: string;
  readonly published_date: string;
  readonly affected_assets: readonly VulnerableAsset[];
  readonly exploit_available: boolean;
  readonly exploit_maturity: ExploitMaturity;
  readonly remediation_available: boolean;
  readonly patch_available: boolean;
  readonly vendor: string;
  readonly product: string;
  readonly version_affected: string;
  readonly tags: readonly string[];
  readonly risk_score: number;
}

export type VulnerabilityStatus = 'open' | 'in_progress' | 'remediated' | 'accepted_risk' | 'false_positive';
export type ExploitMaturity = 'unproven' | 'proof_of_concept' | 'functional' | 'high' | 'not_defined';

export interface VulnerableAsset {
  readonly id: string;
  readonly name: string;
  readonly criticality: Severity;
}

// Enhanced Incident interface
export interface Incident extends TimestampedEntity {
  readonly title: string;
  readonly description: string;
  readonly severity: Severity;
  readonly status: IncidentStatus;
  readonly assigned_to: string;
  readonly assigned_team: string;
  readonly sla_policy: string;
  readonly sla_breach_time: string;
  readonly sla_status: SLAStatus;
  readonly affected_assets: readonly IncidentAsset[];
  readonly related_alerts: readonly IncidentAlert[];
  readonly tags: readonly string[];
  readonly priority_score: number;
  readonly escalation_level: number;
  readonly business_impact: BusinessImpact;
  readonly containment_status: ContainmentStatus;
}

export type IncidentStatus = 'open' | 'investigating' | 'contained' | 'eradicated' | 'recovered' | 'closed';
export type SLAStatus = 'within_sla' | 'approaching_breach' | 'breached';
export type BusinessImpact = 'minimal' | 'minor' | 'moderate' | 'major' | 'catastrophic';
export type ContainmentStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

export interface IncidentAsset {
  readonly id: string;
  readonly name: string;
  readonly criticality: Severity;
}

export interface IncidentAlert {
  readonly id: string;
  readonly title: string;
  readonly severity: Severity;
}

// Enhanced User interface
export interface User extends TimestampedEntity {
  readonly username: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly display_name: string;
  readonly status: UserStatus;
  readonly department: string;
  readonly job_title: string;
  readonly manager: string;
  readonly location: string;
  readonly employee_id: string;
  readonly last_login: string;
  readonly last_activity: string;
  readonly mfa_enabled: boolean;
  readonly password_last_changed: string;
  readonly account_locked: boolean;
  readonly groups: readonly UserGroup[];
  readonly roles: readonly UserRole[];
  readonly risk_assessment: UserRiskAssessment;
  readonly source: string;
  readonly external_id: string;
  readonly last_sync: string;
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'locked' | 'pending_activation';

export interface UserGroup {
  readonly id: string;
  readonly name: string;
}

export interface UserRole {
  readonly id: string;
  readonly name: string;
}

export interface UserRiskAssessment {
  readonly overall_score: number;
  readonly risk_level: Severity;
  readonly factors: readonly RiskFactor[];
}

export interface RiskFactor {
  readonly type: string;
  readonly severity: Severity;
}

// Dashboard and metrics interfaces
export interface DashboardKPIs {
  readonly total_assets: number;
  readonly active_alerts: number;
  readonly open_incidents: number;
  readonly critical_vulnerabilities: number;
  readonly alerts_trend: readonly number[];
  readonly incidents_trend: readonly number[];
  readonly vulnerabilities_trend: readonly number[];
  readonly mean_time_to_response: number;
  readonly mean_time_to_resolution: number;
  readonly security_score: number;
}

// API response interfaces
export interface PaginatedResponse<T> {
  readonly data: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly total_pages: number;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T;
  readonly message?: string;
  readonly errors?: readonly string[];
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: unknown;
}

// Filter and search interfaces
export interface FilterOptions {
  readonly severity?: readonly Severity[];
  readonly status?: readonly string[];
  readonly assigned_to?: readonly string[];
  readonly tags?: readonly string[];
  readonly date_range?: DateRange;
  readonly search?: string;
}

export interface DateRange {
  readonly start: string;
  readonly end: string;
}

export interface SortOptions {
  readonly field: string;
  readonly direction: 'asc' | 'desc';
}

// Component prop interfaces
export interface ComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export interface LoadingState {
  readonly loading: boolean;
  readonly error?: string | null;
}

export interface FormState<T> extends LoadingState {
  readonly data: T;
  readonly isDirty: boolean;
  readonly isValid: boolean;
  readonly errors: Record<keyof T, string>;
}

// Navigation and routing types
export interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly icon?: React.ComponentType;
  readonly children?: readonly NavItem[];
  readonly requiresAuth?: boolean;
  readonly permissions?: readonly string[];
}

// Theme and UI types
export type Theme = 'light' | 'dark' | 'auto';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  readonly id: string;
  readonly type: ToastType;
  readonly title: string;
  readonly message: string;
  readonly duration?: number;
  readonly autoClose?: boolean;
}

// Utility types
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
