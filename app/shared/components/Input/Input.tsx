import React, { useState } from 'react';
import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputProps extends TextInputProps {
  label?: string;
}

interface FormInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextInputProps, 'defaultValue'> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...props} />
    </>
  );
};

const FormInput = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  defaultValue,
  ...props
}: FormInputProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
    rules,
    defaultValue,
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

interface PasswordInputProps extends InputProps {
  showToggle?: boolean;
}

interface FormPasswordInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextInputProps, 'defaultValue'> {
  label?: string;
  showToggle?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  showToggle = true,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={!isPasswordVisible}
          {...props}
        />
        {showToggle && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const FormPasswordInput = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  defaultValue,
  showToggle = true,
  ...props
}: FormPasswordInputProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
    rules,
    defaultValue,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          secureTextEntry={!isPasswordVisible}
          {...props}
        />
        {showToggle && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});

export { Input, FormInput, PasswordInput, FormPasswordInput };
