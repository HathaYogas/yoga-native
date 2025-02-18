import React from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
}

interface FormInputProps extends InputProps {
  name: string;
  control: Control<any>;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...props} />
    </>
  );
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export { Input, FormInput };
