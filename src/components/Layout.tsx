import React, { useEffect, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "./Header/Header";
import { Menu } from "./Header/Menu";
import AddButton from "./AddButton";

export const Layout = () => {
    const [menu, setMenu] = React.useState(false);

    useEffect(() => {
        console.log(menu ? 'ouvert' : 'fermé');
    }, [menu]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* {children} */}
            </View>
            <AddButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    contentContainer: {
        flex: 1,
    },
});
