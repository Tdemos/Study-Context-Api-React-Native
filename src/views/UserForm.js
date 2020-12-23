import React, { useContext, useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {

    const [user, setUser] = useState(route.params ? route.params : {});

    const { dispatch } = useContext(UsersContext);

    return (
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput style={styles.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Informe o nome"
                value={user.name}
            />
            <Text>Email</Text>
            <TextInput style={styles.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Informe o email"
                value={user.email}
            />
            <Text>Foto url</Text>
            <TextInput style={styles.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder="Informe o link da foto"
                value={user.avatarUrl}
            />
            <Button
                title="Salvar"
                onPress={() => {

                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })
                    navigation.goBack()
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 10
    }
});