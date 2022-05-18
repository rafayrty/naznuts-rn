import React, {Children} from 'react';
import {FormControl, Text, Input, Stack} from 'native-base';

type Props = {
  label: string;
  placeholder?: string;
  isInvalid: boolean;
  errorMsg?: string;
  children?: React.ReactNode;
};
const TextInput: React.FC<Props> = ({
  label,
  isInvalid = false,
  errorMsg,
  children,
}) => {
  return (
    <FormControl width="100%" isInvalid={isInvalid}>
      <Stack>
        <FormControl.Label>
          <Text fontFamily={'Cairo'} color="trueGray.400" fontWeight="600">
            {label}
          </Text>
        </FormControl.Label>
        {children}
        <FormControl.ErrorMessage>
          <Text fontFamily={'Cairo'} fontWeight={800} fontSize={14}>
            {errorMsg}
          </Text>
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export default TextInput;
