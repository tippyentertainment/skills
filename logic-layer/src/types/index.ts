// Logic Layer Types
// Core type definitions for triggers, channels, and timing

export type TriggerType = 
  | 'webhook'
  | 'schedule'
  | 'event'
  | 'manual'
  | 'condition';

export type ChannelType = 
  | 'email'
  | 'sms'
  | 'push'
  | 'webhook'
  | 'slack'
  | 'discord'
  | 'in-app';

export type TimingMode = 
  | 'immediate'
  | 'delayed'
  | 'scheduled'
  | 'recurring';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Trigger {
  id: string;
  type: TriggerType;
  name: string;
  description?: string;
  enabled: boolean;
  config: TriggerConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface TriggerConfig {
  webhookPath?: string;
  webhookMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  webhookSecret?: string;
  cronExpression?: string;
  timezone?: string;
  eventType?: string;
  eventFilters?: Record<string, unknown>;
  conditions?: Condition[];
  requiresApproval?: boolean;
}

export interface Condition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'exists';
  value: unknown;
}

export interface Channel {
  id: string;
  type: ChannelType;
  name: string;
  enabled: boolean;
  priority: number;
  config: ChannelConfig;
  rateLimits?: RateLimit;
}

export interface ChannelConfig {
  emailAddress?: string;
  emailTemplate?: string;
  phoneNumber?: string;
  deviceToken?: string;
  webhookUrl?: string;
  webhookHeaders?: Record<string, string>;
  slackChannel?: string;
  slackWebhookUrl?: string;
  discordWebhookUrl?: string;
  userId?: string;
}

export interface RateLimit {
  maxPerMinute?: number;
  maxPerHour?: number;
  maxPerDay?: number;
  cooldownSeconds?: number;
}

export interface TimingRule {
  id: string;
  mode: TimingMode;
  delay?: number;
  scheduledTime?: Date;
  recurring?: RecurringConfig;
  timezone: string;
  blackoutWindows?: BlackoutWindow[];
}

export interface RecurringConfig {
  frequency: 'minutely' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  interval: number;
  onDays?: DayOfWeek[];
  onDayOfMonth?: number;
  startTime?: string;
  endTime?: string;
  endDate?: Date;
  maxOccurrences?: number;
}

export interface BlackoutWindow {
  startTime: string;
  endTime: string;
  days?: DayOfWeek[];
  reason?: string;
}

export interface LogicRule {
  id: string;
  name: string;
  description?: string;
  trigger: Trigger;
  channels: Channel[];
  timing: TimingRule;
  enabled: boolean;
  priority: number;
  conditions?: Condition[];
  metadata?: Record<string, unknown>;
}

export interface ExecutionResult {
  success: boolean;
  ruleId: string;
  triggerId: string;
  channelResults: ChannelExecutionResult[];
  executedAt: Date;
  duration: number;
  error?: string;
}

export interface ChannelExecutionResult {
  channelId: string;
  channelType: ChannelType;
  success: boolean;
  responseTime: number;
  error?: string;
  metadata?: Record<string, unknown>;
}