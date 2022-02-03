import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useIMask } from "react-imask";
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    IconButton,
    Input,
    useColorMode,
    useToast
} from '@chakra-ui/react';

export const App: React.FC = () => {
    const [branch, setBranch] = useState<string>('');
    const [container, setContainer] = useState<string>('');
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const initialMount = React.useRef(false);
    const toast = useToast()

    const { ref } = useIMask({
        mask: 'NFLT-000000000000000'
    }, {
        onAccept: (value) => setContainer(value)
    });

    async function onSubmit() {

        try {

            setSubmitLoading(true);
            const { data } = await api.post('/', { branch, container: container.replace(/([NFLT\-_])+/g, '') });
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            const fileName = `sofitview - ${branch && `branch: ${branch}`}${container ? `Container: NFLT-${container.replace(/([NFLT\-_])+/g, '')}` : 'PROD'}.apk`
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            toast({
                title: 'BOA!😎',
                description: 'Seu APK foi gerado com sucesso!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch {

            toast({
                title: 'EITA!🥲',
                description: 'Tivemos algum problema no momento de gerar o APK',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {

            setSubmitLoading(false);
        }
    }

    useEffect(() => {

        if (colorMode === 'light' && !initialMount.current) {

            toggleColorMode();
        }
        initialMount.current = true;
    }, [colorMode, toggleColorMode]);

    return (
        <Flex
            width='full'
            height='100vh'
            align='center'
            justifyContent='center'
        >
            <Box position='absolute' right='10px' top='10px'>
                <IconButton
                    icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
                    variant='outline'
                    colorScheme='gray'
                    aria-label='Color mode Switcher'
                    onClick={toggleColorMode}
                >
                    Switch mode
                </IconButton>
            </Box>
            <Center
                height='full'
                flexDirection='column'
            >
                <Heading
                    size='2xl'
                    color='teal.500'
                >
                    AutomaThor
                </Heading>
                <FormControl mt='8'>
                    <FormLabel htmlFor='branch'>Branch</FormLabel>
                    <Input
                        id='branch'
                        placeholder='Padrão: master'
                        value={branch}
                        onChange={e => setBranch(e.target.value)}
                    />
                    <FormHelperText>
                        Aqui você deve preencher de qual branch quer gerar o APK
                    </FormHelperText>
                </FormControl>
                <FormControl mt='5' mb='5'>
                    <FormLabel htmlFor='container'>Container</FormLabel>
                    <Input
                        mask='NFLT-999999'
                        ref={ref as React.RefObject<HTMLInputElement>}
                        id='container'
                        placeholder='Padrão: Produção'
                        value={container}
                        onChange={e => setContainer(e.target.value)}
                    />
                    <FormHelperText>
                        Aqui você deve preencher para onde o APK deve apontar
                    </FormHelperText>
                </FormControl>
                <Button
                    mt={4}
                    colorScheme='gray'
                    isLoading={submitLoading}
                    onClick={onSubmit}
                    type='submit'
                >
                    Gerar APK
                </Button>
            </Center>
        </Flex>
    );
};