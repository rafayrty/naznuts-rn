import React from 'react';
import {FormControl, Text, Stack, Input} from 'native-base';
import Eye from '../icons/Eye';
import {TouchableOpacity} from 'react-native';

type Props = {
  label: string;
  placeholder?: string;
  isInvalid: boolean;
  errorMsg?: string;
};

const PassInput: React.FC<Props> = ({
  label,
  placeholder,
  isInvalid,
  errorMsg,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl width="100%" isInvalid={isInvalid}>
      <Stack>
        <FormControl.Label>
          <Text fontFamily={'Cairo'} color="trueGray.400" fontWeight="600">
            {label}
          </Text>
        </FormControl.Label>
        <Input
          p={2}
          fontFamily={'Cairo'}
          fontSize={12}
          type={show ? 'text' : 'password'}
          textAlign="right"
          placeholder={placeholder}
          InputRightElement={
            <TouchableOpacity onPress={handleClick} style={{paddingRight: 15}}>
              {/* <Icon name="eye" size={30} color="#900" />; */}
              {show ? <Eye /> : <Eye />}
            </TouchableOpacity>
          }
        />
        <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export default PassInput;
