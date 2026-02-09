import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export default function CategoryCard({
  icon: Icon,
  title,
  description,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:border-[(--p24-cyan)] hover:shadow-lg transition-all duration-200 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-[(--p24-cyan)] flex items-center justify-center mb-4 transition-colors">
        <Icon className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-[(--p24-dark)] mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}
