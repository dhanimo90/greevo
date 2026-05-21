interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: { label: string; onClick?: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-4 text-sm">
          {action.label}
        </button>
      )}
    </div>
  );
}
