import React, { useEffect, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { AddButton } from "./AddButton";


export const Layout = ({ children }: { children: ReactNode }) => {
    const [menu, setMenu] = React.useState(false);

    useEffect(() => {
        console.log(menu ? 'ouvert' : 'fermé');
    }, [menu]);

    return (
        <View style={styles.container}>
            <Header menu={menu} setMenu={setMenu} />
                {menu && <Menu menu={menu} setMenu={setMenu} />}
                {children}
            <AddButton />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: 'relative',
    top: 0,
    height: '100%',
    backgroundColor: 'red',
  },
});
