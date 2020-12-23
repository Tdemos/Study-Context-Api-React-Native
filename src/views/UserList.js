import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { View, FlatList } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {

    const { state, dispatch } = useContext(UsersContext);

    function confirmUserDeletion(user){
        Alert.alert('Excluir usuario', 'Deseja excluir o usuario?',
        [
            { text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    });
                }
            },{
                text: 'Nao'

            }
        ]
        
        );
    }

    function getActions(user) {
        return (
            //Fragment
            <>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}

                />

                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='red' />}

                />
            </>

        )
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                leftAvatar={{ source: { uri: user.avatarUrl } }}
                key={user.id} bottomDivider
                rightElement={getActions(user)}
                title={user.name}
                subtitle={user.email}
                rightElement={getActions(user)}
                onPress={() => props.navigation.navigate('UserForm')}
            />
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    );

}