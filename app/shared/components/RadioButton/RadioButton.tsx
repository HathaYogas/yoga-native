import React from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

interface FormRadioButtonProps<T extends FieldValues>
  extends UseControllerProps<T> {
  options: T[keyof T][];
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionContainer}
          onPress={() => onSelect(option)}
        >
          <View style={styles.circle}>
            {selectedOption === option && <View style={styles.checkedCircle} />}
          </View>
          <Text style={styles.label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FormRadioButton = <T extends FieldValues>({
  name,
  control,
  options,
  rules,
}: FormRadioButtonProps<T>) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionContainer}
          onPress={() => field.onChange(option)}
        >
          <View style={styles.circle}>
            {field.value === option && <View style={styles.checkedCircle} />}
          </View>
          <Text style={styles.label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
});

export { RadioButton, FormRadioButton };
