import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, FlatList, Text, Clipboard } from 'react-native';

import { TextInput, Button, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const CrypASym = (props) => {





    const [message, setMessage] = useState("");
    const [mdp, setMdp] = useState("");
    const [algo, setAlgo] = useState("RSA");
    const [enableShift, setEnableShift] = useState(false);
    const [key, setKey] = useState({ pk: "01", name: "key A", public: "aaaa", private: "bbbbb" });
    const [resultat, setResultat] = useState("");
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState("crypt")

    var radio_props = [
        { label: 'Crypt', value: "crypt" },
        { label: 'Sign', value: "sign" }
    ];


    const fetchData = () => {

        fetch("http://332c23ccff7a.ngrok.io/liste_cle_asym/"
        ).then((res) => res.json()).then((vals) => {

            setKeys(vals)
            setLoading(false)
        }).catch(err => {
            Alert.alert("something went wrong , try later");
        })

    }
    useEffect(() => {
        fetchData()
    }, [])




    const submitCryptData = () => {
        fetch("http://332c23ccff7a.ngrok.io/chiffrement_asym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    algo: algo,
                    public: key.public

                })
            }).then(res => res.json()).then(data => {
                Clipboard.setString(data.resultat)
                console.log("this is crypt option")
                setResultat(data.resultat);

            })
    }

    const submitSignData = () => {
        fetch("http://332c23ccff7a.ngrok.io/signature_asym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    algo: algo,
                    mdp: mdp,
                    private: key.private

                })
            }).then(res => res.json()).then(data => {
                Clipboard.setString(data.resultat)
                console.log("copied");
                setResultat(data.resultat);
                setLoading(false);
            })
    }



    const generateKey = () => {
        fetch("http://332c23ccff7a.ngrok.io/generation_cle_asym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    algo,
                    mdp

                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                setKeys([data, ...keys])
            })
    }


    const exportKey = (name) => {

        fetch("http://332c23ccff7a.ngrok.io/export_cle_asym/",

            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            }).then((res) => res.json()).then((vals) => {
                console.log(vals);
                let keyexport = vals.name + " public : " + vals.public + " private : " + vals.private
                Clipboard.setString(keyexport)
                Alert.alert("key exported !:" + JSON.stringify(keyexport));
            }).catch(err => {
                Alert.alert("something went wrong , try later");
            })

    }




    const renderList = ((item) => {
        return (

            <Card style={styles.mycard} key={item._id}

                onPress={async (data) => {
                    console.log(item)
                    Clipboard.setString(item.public)
                    Alert.alert("Key selected and  Copied for crypting !");
                    setKey(item);

                }}

                onLongPress={
                    async (data) => {
                        exportKey(item.name)

                    }
                }
            >
                <View style={item.public != key.public ? styles.CardView : [styles.CardView, { backgroundColor: '#ADD8E6' }]}>

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
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }} >


                <DropDownPicker
                    items={[

                        { label: 'RSA', value: 'RSA' },

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
                <TextInput
                    style={styles.inputStyle}
                    label='mot de passe'
                    value={mdp}
                    placeholder={'enter votre mot de passe'}
                    mode="outlined"
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMdp(text)}
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
                        keyExtractor={item => item._id}
                        onRefresh={() => { fetchData() }}
                        refreshing={loading}
                        extraData={keys}
                    />
                    : null}

                <RadioForm
                    style={{ marginTop: 20 }}
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { console.log(value); setCheck(value); }}
                />

                <TextInput
                    style={styles.inputStyle}
                    label='Message'
                    value={message}
                    placeholder={'enter the message'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />


                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() => { check == "crypt" ? submitCryptData() : submitSignData() }}>
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

export default CrypASym; 