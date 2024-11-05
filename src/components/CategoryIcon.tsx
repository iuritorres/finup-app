import { AppStyles } from '@/AppStyles';
import { CategoryIcons } from '@/types/enums';
import { CircleHelp } from 'lucide-react-native';
import { StyleSheet, Text } from 'react-native';

interface IProps {
  category: string;
}

export const CategoryIcon = ({ category }: IProps) => {
  const categoryKey = category.toLowerCase() as keyof typeof CategoryIcons;
  const Icon = CategoryIcons[categoryKey] || CircleHelp;

  return (
    <Text style={style.container}>
      <Icon size={26} color={AppStyles.colors.textPrimary} />
    </Text>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.colors.backgroundSecondary,
    borderRadius: AppStyles.insets.borderRadius,
    padding: 8,
  },
});
