import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, FlatList, Text, Clipboard } from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-paper';

const CrypSym = (props) => {





    const [message, setMessage] = useState("");
    const [algo, setAlgo] = useState("AES");
    const [enableShift, setEnableShift] = useState(false);
    const [key, setKey] = useState("aaaa");
    const [resultat, setResultat] = useState("");
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);



    const fetchData = () => {

        fetch("http://332c23ccff7a.ngrok.io/liste_cle_sym/"
        ).then((res) => res.json()).then((vals) => {

            setKeys(vals)
            setLoading(false)
        }).catch(err => {
            Alert.alert("something went wrong , try later");
        })

    }

    useEffect(() => {
        fetchData()
    },[])




    const submitData = () => {
        fetch("http://332c23ccff7a.ngrok.io/chiffrement_sym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    algo: algo,
                    cle: key

                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                setResultat(data.resultat);

            })
    }



    const generateKey = () => {
        fetch("http://332c23ccff7a.ngrok.io/generation_cle_sym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    algo,

                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                setKeys([data, ...keys])
            })
    }


    const exportKey = (name) => {

        fetch("http://332c23ccff7a.ngrok.io/export_cle_sym/",

            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            }).then((res) => res.json()).then((vals) => {
                console.log(vals) ;
                let keyexport = vals.name + " value : "+vals.value ;
                Clipboard.setString(keyexport)
                Alert.alert("key exported !: " + JSON.stringify(keyexport));
            }).catch(err => {
                Alert.alert("something went wrong , try later");
            })

    }


    const renderList = ((item) => {
        return (

            <Card style={styles.mycard} key={item.pk}

                onPress={async (data) => {
                    console.log(item.value)
                    Clipboard.setString(item.value)
                    Alert.alert("Key selected and  Copied for crypting !");
                    setKey(item.value);

                }}

                onLongPress={
                    async (data) => {
                        exportKey(item.name)

                    }
                }
            >
                <View style={item.value != key ? styles.CardView : [styles.CardView, { backgroundColor: '#ADD8E6' }]}>

                    <View style={{
                        marginLeft: 15,
                    }}>
                        <Text style={styles.text} >{item.name}</Text>
                    </View>

                </View>
            </Card>

        );

    });




    //view 

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View style={{  paddingHorizontal : 10 , paddingVertical : 5 }}>

                <TextInput
                    style={styles.inputStyle}
                    label='Message'
                    value={message}
                    placeholder={'enter the message'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />


                <DropDownPicker
                    items={[
                        { label: 'AES', value: 'AES' },
                        { label: 'Camellia', value: 'Camellia' },
                        { label: 'SEED', value: 'SEED' },
                        { label: 'AES', value: 'AES' },

                    ]}
                    defaultValue={algo}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setAlgo(item.value)
                    }
                />

                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() => generateKey()}>
                    Generate Key
            </Button>


                {keys ?
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={keys}
                        renderItem={({ item }) => {

                            return renderList(item);
                        }}
                        keyExtractor={item => item.pk}
                        onRefresh={() => { fetchData() }}
                        refreshing={loading}
                        extraData={keys}
                    />
                    : null}


                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle ,{marginTop: 20} }  raised icon="check-circle-outline" mode="contained" onPress={() => submitData()}>
                    Crypt
                 </Button>


                {resultat ?
                    < TextInput
                        style={styles.inputStyle}
                        label='Cipher '
                        value={resultat}
                        placeholder={'hashed message'}
                        mode="outlined"
                        theme={{ colors: { primary: '#03a5fc' } }}
                        onChangeText={text => { }}
                    />
                    : null}




            </View>

        </KeyboardAvoidingView>
    );

}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5,
    },
    pop: {
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,

    },
    modalview: {

        position: 'absolute',
        bottom: 2,
        width: "100%",
        backgroundColor: '#ffffff',

    },

    mycard: {
        margin: 3,

    },
    CardView: {

        flexDirection: 'row',
        padding: 2,

    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
    },




});

export default CrypSym; 