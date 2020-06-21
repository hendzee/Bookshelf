import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, FloatingButton, SmallModal } from '../components/general';
import { MainInfo, ItemInfo } from '../components/item_detail_screen';
import { status, getSpecificItem, addTransaction } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const EditIcon = (style) => (
    <Icon {...style } name='edit-2-outline' />
);

class ItemDetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 3,
            data: {}, // Data of item
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
            isLoading: false // Loading state
        }
    }

    async componentDidMount() {
        let id = this.props.route.params.id;

        let getData = await getSpecificItem(id);

        this.setState({
            data: getData.status === status.OK ? getData.data : {}
        });
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Show edit icon */
    showEditIcon = () => (
        <TopNavigationAction icon={ EditIcon } onPress={ this.toEditScreen } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Navigate to detail chat screen */
    toChatDetailScreen = () => {
        this.props.navigation.navigate('CHAT_DETAIL');
    }

    /** To edit screen */
    toEditScreen = () => {
        this.props.navigation.navigate('EDIT_ITEM', { id: this.state.data.id })
    }

    /** Handle save data */
    handleSave = () => {
        this.setState({ isLoading: true, isSaved: true }, () => {
            let data = {
                borrowerId: this.state.userId,
                ownerId: this.state.data.user_id,
                itemId: this.state.data.id
            }

            addTransaction(data)
                .then((response) => {
                    this.setState({ isLoading: false, isSaved: false }, () => {
                        this.toCart(response.data.id);
                    });
                })
                .catch(error => {
                    this.setState({ 
                        isLoading: false, 
                        responseTitle: error.message, 
                        isResponseError: true 
                    });
                });

        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false });
    };

    /** Handle navigation to cart screen */
    toCart = (transactionId) => {
        this.props.navigation.navigate('CART', { transactionId: transactionId });
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Book Detail'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                    rightControls={ this.showEditIcon() }
                />

                <ScrollView>
                    <Layout style={ styles.mainContainer }>
                        <MainInfo
                            data={ this.state.data } 
                            navigation={ this.props.navigation } 
                            handleSave={ this.handleSave }
                        />
                        <ItemInfo 
                            data={ this.state.data } 
                        />
                    </Layout>
                </ScrollView>
                <FloatingButton icon='message-circle' onPress={ this.toChatDetailScreen } />

                {/* Modal when saved */}
                <SmallModal
                    title={ this.state.responseTitle }
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSave } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSaved } 
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        ...generalSty.full
    },

    mainContainer: {
        ...generalSty.mainContainer
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },
});

export { ItemDetailScreen };