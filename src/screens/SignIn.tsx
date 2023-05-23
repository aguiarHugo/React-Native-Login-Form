import axios from 'axios';
import {VStack, Heading, Center} from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react';
import { Image } from "react-native";

import Input from '../../components/Input';
import Button from '../../components/Button';

type FormDataProps = {
  cpf: string;
  password: string;
}

export default function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: FormDataProps) => {
    console.log('Dados de login:', data);
    try {
      setIsLoading(true);
      console.log('Iniciando requisição de login...');
  
      const response = await fetch('http://vrupt.com.br/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cpf: encodeURIComponent(data.cpf),
          password: encodeURIComponent(data.password)
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Resposta da requisição de login:', data);
      } else {
        console.error('Erro ao efetuar login:', response.status);
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      setIsLoading(false);
    }
  }
  
  return (
    <VStack bgColor='gray.800' flex={1} px={10} >
      <Center mt={40}>
      <Image
        source={require('../../assets/favicon.png')}
        alt='logo'
      />
        <Heading color='white' mb={4}>
          Login
        </Heading>

        <Controller 
          control={control}
          name='cpf'
          rules={{ required: 'Campo obrigatório' }}
          render={({ field: { onChange } }) =>(
            <Input 
            placeholder='CPF' 
            placeholderTextColor='white' 
            errorMessage={errors.cpf?.message}
            onChangeText={onChange}
            />
            )}
        />

        <Controller 
          control={control}
          name='password'
          rules={{ required: 'Campo obrigatório' }}
          render={({ field: { onChange } }) => (
            <Input 
              placeholder='Senha' 
              placeholderTextColor='white'
              errorMessage={errors.password?.message}
              secureTextEntry
              onChangeText={onChange}
            />
          )}
        />

        <Button   
          title={isLoading ? 'Entrando...' : 'Entrar'} 
          onPress={handleSubmit(handleSignIn)} 
        />
      </Center>
    </VStack>
  );
}