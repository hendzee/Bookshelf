import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Button, 
    Text 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal, CustomTouchableOpacity } from '../components/general';

/** import CRUD function */
import { dummyFunctionData, addPeriod } from '../modules';

const CloseIcon = (style) => (
    <Icon { ...style } name='close-outline' />
)

class SearchItemFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption1: 1, // Selected option index of option 1
            selectedOption2: 1, // Selected option index of option 1
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
            isLoading: false // Loading state
        }
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ CloseIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Handle save data */
    handleSave = () => {
        this.setState({ isLoading: true, isSaved: true }, () => {
            addPeriod(
                () => {
                    dummyFunctionData().then(response => {
                        this.setState({ 
                            isLoading: false, 
                            responseTitle: response.message,
                            isResponseError: false
                        });
                    }).catch(err => {
                        this.setState({ 
                            isLoading: false,
                            responseTitle: err.message,
                            isResponseError: true
                        });
                    })
                }
            )
        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false }, () => {
            this.handleBack();
        });
    };

    /** Handle option 1 */
    handleOption1 = (option) => {
        this.setState({ selectedOption1: option });
    }

    /** Handle option 2 */
    handleOption2 = (option) => {
        this.setState({ selectedOption2: option });
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Filter'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Filter list content - start */}
                    <Layout>
                        <Layout style={ styles.subtitleContainer }>
                            <Text style={ styles.bold }>Order By:</Text>
                        </Layout>
                        <Layout style={ styles.itemGroupContainer }>
                            <Button 
                                appearance={ this.state.selectedOption1 === 1 ? 'filled' : 'ghost' }
                                status={ this.state.selectedOption1 === 1 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption1(1) }
                            >
                                Title
                            </Button>
                            <Button 
                                appearance={ this.state.selectedOption1 === 2 ? 'filled' : 'ghost' } 
                                status={ this.state.selectedOption1 === 2 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption1(2) }
                            >
                                Publish Date
                            </Button>
                        </Layout>
                        
                        <Layout style={ styles.subtitleContainer }>
                            <Text style={ styles.bold }>Sorting:</Text>
                        </Layout>
                        <Layout style={ styles.itemGroupContainer }>
                            <Button 
                                appearance={ this.state.selectedOption2 === 1 ? 'filled' : 'ghost' }
                                status={ this.state.selectedOption2 === 1 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption2(1) }
                            >
                                ASC
                            </Button>
                            <Button 
                                appearance={ this.state.selectedOption2 === 2 ? 'filled' : 'ghost' } 
                                status={ this.state.selectedOption2 === 2 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption2(2) }
                            >
                                DESC
                            </Button>
                        </Layout>
                    </Layout>
                    {/* Filter list content - end */}

                    {/* Bottom container - start */}
                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSave } status='primary'>
                            SAVE
                        </Button>
                    </Layout>
                    {/* Bottom container - end */}
                </Layout>

                {/* Modal when save complete */}
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

    subtitleContainer: {
        ...generalSty.mlBottom
    },

    bold: {
        fontWeight: 'bold'
    },

    itemGroupContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },

    itemContainer: {
        ...generalSty.allRadius,
        ...generalSty.plAll,
        ...generalSty.mmRight
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },
});

export { SearchItemFilter };