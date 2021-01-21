import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, BackHandler } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const Home = (props) => {

    const [visible, setVisible] = React.useState(false);
    const [visibleSymetrique, setVisibleSymetrique] = React.useState(false);
    const [visibleASymetrique, setVisibleASymetrique] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openMenuSymetrique = () => setVisibleSymetrique(true);
    const closeMenuSymetrique = () => setVisibleSymetrique(false);


    const openMenuASymetrique = () => setVisibleASymetrique(true);
    const closeMenuASymetrique = () => setVisibleASymetrique(false);

    //code view 
    return (
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>


            <Menu
                visible={visible}
                onDismiss={closeMenu}
                style={styles.menu}
                anchor={
                    <Card style={styles.mycard} key={10}
                        onPress={() => { openMenu() }}
                    >
                        <View style={styles.CardView}>


                            <View style={{
                                marginLeft: 15,
                            }}>
                                <Text style={styles.text} >1 - Codage et décodage d'un message </Text>
                                <Text >(Base64)</Text>
                            </View>

                        </View>
                    </Card>

                }>
                <Menu.Item onPress={() => { props.navigation.navigate("Codage"); closeMenu() }} title="Coder un message" />
                <Divider />
                <Menu.Item onPress={() => { props.navigation.navigate("Decodage"); closeMenu() }} title="décoder un message" />

            </Menu>



            <Card style={styles.mycard} key={5}
                onPress={() => { props.navigation.navigate("Hachage") }}
            >
                <View style={styles.CardView}>


                    <View style={{
                        marginLeft: 15,
                    }}>
                        <Text style={styles.text} >2 - Hachage d'un message</Text>
                        <Text ></Text>
                    </View>

                </View>
            </Card>


            <Card style={styles.mycard} key={3}
                onPress={() => { props.navigation.navigate("Craquer mot de passe") }}
            >
                <View style={styles.CardView}>


                    <View style={{
                        marginLeft: 15,
                    }}>
                        <Text style={styles.text} >3 - Craquage d'un message haché </Text>
                        <Text ></Text>
                    </View>

                </View>
            </Card>



            <Menu
                visible={visibleSymetrique}
                onDismiss={closeMenuSymetrique}
                style={styles.menu}
                anchor={

                    <Card style={styles.mycard} key={2}
                        onPress={() => { openMenuSymetrique() }}
                    >
                        <View style={styles.CardView}>


                            <View style={{
                                marginLeft: 15,
                            }}>
                                <Text style={styles.text} >4 - Chiffrement et déchiffrement d'un message </Text>
                                <Text >(Symétrique)</Text>
                            </View>

                        </View>
                    </Card>

                }>
                <Menu.Item onPress={() => { props.navigation.navigate("Crypt Symetrique"); closeMenuSymetrique() }} title="chiffrer un message " />
                <Divider />
                <Menu.Item onPress={() => { props.navigation.navigate("DeCrypt Symetrique"); closeMenuSymetrique() }} title="déchiffrer un message" />

            </Menu>





            <Menu
                visible={visibleASymetrique}
                onDismiss={closeMenuASymetrique}
                style={styles.menu}
                anchor={


                    <Card style={styles.mycard} key={1}
                        onPress={() => { openMenuASymetrique() }}
                    >
                        <View style={styles.CardView}>


                            <View style={{
                                marginLeft: 15,
                            }}>
                                <Text style={styles.text} >5 - Chiffrement et déchiffrement d'un message</Text>
                                <Text >(Asymétrique)</Text>
                            </View>

                        </View>
                    </Card>

                }>
                <Menu.Item onPress={() => { props.navigation.navigate("Crypt/sign ASymetrique"); closeMenuASymetrique() }} title="chiffrer un message " />
                <Divider />
                <Menu.Item onPress={() => { props.navigation.navigate("Crypt/sign ASymetrique"); closeMenuASymetrique() }} title="signer un message" />
                <Divider />
                <Menu.Item onPress={() => { props.navigation.navigate("DeCrypt/verify ASymetrique"); closeMenuASymetrique() }} title="déchiffrer un message" />
                <Divider />
                <Menu.Item onPress={() => { props.navigation.navigate("DeCrypt/verify ASymetrique"); closeMenuASymetrique() }} title="verifiier la signature " />
            </Menu>




            <Card style={styles.mycard} key={6
            }
                onPress={() => { BackHandler.exitApp(); }}
            >
                <View style={styles.CardView}>


                    <View style={{
                        marginLeft: 15,
                    }}>
                        <Text style={styles.text} >6 - Quitter </Text>
                        <Text ></Text>
                    </View>

                </View>
            </Card>






           

        </View>
    );
}

const styles = StyleSheet.create({
    menu: { left: "45%", paddingTop: "3%" },
    mycard: {
        margin: 3,

    },
    CardView: {
        flexDirection: 'row',
        padding: 5,

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




export default Home