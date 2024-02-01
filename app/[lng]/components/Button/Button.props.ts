export type ButtonProps = {
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  id: string;
  type?: 'button' | 'submit' | 'reset';
};
