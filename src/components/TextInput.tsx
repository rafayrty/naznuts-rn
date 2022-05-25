import React from 'react';
import {FormControl, Text, Stack, Box} from 'native-base';

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
        {/* <FormControl.ErrorMessage> */}
        {isInvalid && (
          <Box marginTop={2}>
            <Text
              textAlign={'left'}
              color="danger.500"
              fontSize={12}
              fontWeight={700}
              fontFamily={'Cairo'}>
              {errorMsg}
            </Text>
          </Box>
        )}
        {/* </FormControl.ErrorMessage> */}
      </Stack>
    </FormControl>
  );
};

export default TextInput;
