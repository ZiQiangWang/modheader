export interface HeaderProps {
  enabled: boolean;
  data: Array<{
    key: string;
    value: string;
    use: boolean;
  }>;
}
