import { CategoryIcons } from "@/types/enums";
import { CircleHelp } from "lucide-react-native";

interface IProps {
  category: string;
}

export const CategoryIcon = ({ category }: IProps) => {
  const categoryKey = category.toLowerCase() as keyof typeof CategoryIcons;
  const Icon = CategoryIcons[categoryKey] || CircleHelp;

  return <Icon color="#fff" size={26} />;
};
