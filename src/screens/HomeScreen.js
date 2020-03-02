import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { Layout, Text, Input, Card } from '@ui-kitten/components';
import { generalSty } from '../styles';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <Layout style={ styles.mainContainer }>
                    
                    {/** Search box */}
                    <Layout style={ styles.searchBoxContainer }>
                        <Input 
                            placeholder='Search your book'
                            value={ this.state.searchValue }
                        />
                    </Layout>
                    <ScrollView showsVerticalScrollIndicator={ false }>

                        {/** First content - start */}
                        <Layout style={ styles.bodyContent }>
                            <Layout style={ styles.titleContainer }>
                                <Layout style={ styles.titleRow }>
                                    <Layout style={ styles.titleContentLeft }>
                                        <Text>On Your Hand</Text>
                                    </Layout>
                                    <Layout style={ styles.titleContentRight }>
                                        <Text>See All</Text>
                                    </Layout>
                                </Layout>
                            </Layout>

                            <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false }>
                                <Layout style={ styles.cardContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo1.jpeg') }
                                    />
                                    <Layout style={ styles.descCard }>
                                        <Text style={ styles.cardTitle }>The Green Ember</Text>
                                        <Text style={ styles.cardInfo }>2019, Thomas Niels</Text>
                                    </Layout>
                                </Layout>

                                <Layout style={ styles.cardContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo2.jpeg') }
                                    />
                                    <Layout style={ styles.descCard }>
                                        <Text style={ styles.cardTitle }>Slow Dancing on Hard Drugs</Text>
                                        <Text style={ styles.cardInfo }>1995, Jordan JR</Text>
                                    </Layout>
                                </Layout>
                                <Layout style={ styles.cardContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo3.jpeg') }
                                    />
                                    <Layout style={ styles.descCard }>
                                        <Text style={ styles.cardTitle }>After Days</Text>
                                        <Text style={ styles.cardInfo }>2015, Jake Hulk</Text>
                                    </Layout>
                                </Layout>
                            </ScrollView>
                        </Layout>
                        {/** First cotent - end */}

                        {/** Second content - start */}
                        <Layout style={ styles.bodyContent }>
                            <Layout style={ styles.titleContainer }>
                                <Layout style={ styles.titleRow }>
                                    <Layout style={ styles.titleContentLeft }>
                                        <Text>Your Borrow</Text>
                                    </Layout>
                                    <Layout style={ styles.titleContentRight }>
                                        <Text>See All</Text>
                                    </Layout>
                                </Layout>
                            </Layout>

                            <Layout>
                                <Layout style={ styles.secondContent }>
                                    <Layout>
                                        <Image
                                            style={ styles.imageCard }
                                            source={ require('../images/items/item_photo4.jpeg') } 
                                        />
                                    </Layout>
                                    <Layout style={ styles.secondContentInfo }>
                                        <Layout style={ styles.secondContentBody }>
                                            <Text style={ styles.secondContentTitle } >Xoxo Kels</Text>
                                            <Text style={ styles.secondContentSubtitle }>2019, Abdul Malik</Text>
                                        </Layout>
                                        <Text style={ styles.secondContentLabel }>Borrow From:</Text>
                                        <Text style={ styles.secondContentValue }>Albert Setiawan</Text>
                                        <Layout style={ styles.secondContentBottom }>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/** Second content - end */}
                        
                        {/** Third content - start */}
                        <Layout style={ styles.bodyContent }>
                            <Layout style={ styles.titleContainer }>
                                <Layout style={ styles.titleRow }>
                                    <Layout style={ styles.titleContentLeft }>
                                        <Text>Your Borrow</Text>
                                    </Layout>
                                    <Layout style={ styles.titleContentRight }>
                                        <Text>See All</Text>
                                    </Layout>
                                </Layout>
                            </Layout>

                            <Layout style={{ marginBottom: 15 }}>
                                <Layout style={ styles.secondContent }>
                                    <Layout>
                                        <Image
                                            style={ styles.imageCard }
                                            source={ require('../images/items/item_photo4.jpeg') } 
                                        />
                                    </Layout>
                                    <Layout style={ styles.secondContentInfo }>
                                        <Layout style={ styles.secondContentBody }>
                                            <Text style={ styles.secondContentTitle } >Xoxo Kels</Text>
                                            <Text style={ styles.secondContentSubtitle }>2019, Abdul Malik</Text>
                                        </Layout>
                                        <Text style={ styles.secondContentLabel }>Borrow From:</Text>
                                        <Text style={ styles.secondContentValue }>Albert Setiawan</Text>
                                        <Layout style={ styles.secondContentBottom }>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Layout>
                            
                            <Layout>
                                <Layout style={ styles.secondContent }>
                                    <Layout>
                                        <Image
                                            style={ styles.imageCard }
                                            source={ require('../images/items/item_photo4.jpeg') } 
                                        />
                                    </Layout>
                                    <Layout style={ styles.secondContentInfo }>
                                        <Layout style={ styles.secondContentBody }>
                                            <Text style={ styles.secondContentTitle } >Xoxo Kels</Text>
                                            <Text style={ styles.secondContentSubtitle }>2019, Abdul Malik</Text>
                                        </Layout>
                                        <Text style={ styles.secondContentLabel }>Borrow From:</Text>
                                        <Text style={ styles.secondContentValue }>Albert Setiawan</Text>
                                        <Layout style={ styles.secondContentBottom }>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                            <Layout>
                                                <Text style={ styles.secondContentLabel }>return</Text>
                                                <Text style={ styles.secondContentValue }>15/01/2020</Text>
                                            </Layout>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/** Third content - end */}
                    </ScrollView>
                </Layout>
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

    searchBoxContainer: {
        ...generalSty.mlBottom
    },

    titleContainer: {
        ...generalSty.mlBottom,
        alignItems: 'baseline'
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    titleContentLeft: {
        flex: 1
    },

    titleContentRight: {
        flex: 1, 
        alignItems: 'flex-end'
    },

    cardContainer: {
        ...generalSty.mlRight,
        ...generalSty.w150,
        alignItems: 'baseline',
        flexWrap: 'wrap'
    },

    imageCard: {
        ...generalSty.itemImage
    },

    descCard: {
        ...generalSty.mmTop
    },

    cardTitle: {
        ...generalSty.smallText,
        fontWeight: 'bold'
    },

    cardInfo: {
        ...generalSty.smallText
    },

    bodyContent: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    secondContent: {
        flexDirection: 'row',
    },

    secondContentImage: {
        alignItems: 'flex-start',
        ...generalSty.itemImage,
        ...generalSty.mlRight
    },

    secondContentInfo: {
        flexGrow: 1,
        ...generalSty.mlLeft
    },

    secondContentTitle: {
        fontWeight: 'bold'
    },

    secondContentSubtitle: {
        ...generalSty.smallText
    },

    secondContentLabel: {
        ...generalSty.smallText,
        color: '#DDD'
    },

    secondContentBottom: {
        ...generalSty.mlTop,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    secondContentValue: {
        ...generalSty.smallText
    },

    secondContentBody: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        alignItems: 'baseline',
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    }
})

export { HomeScreen };