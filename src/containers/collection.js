import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import BluprintCard from '../components/bluprint-card'
import Breadcrumb from '../components/breadcrumb'
import TopBar from '../components/zooids/top-bar'
import { Page } from '../components/page'

import { fetchBluprints, fetchBluprintsByCollectionId } from '../actions/bluprint-actions'

export default class Collection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { collection, dispatch } = this.props
    dispatch(fetchBluprintsByCollectionId(collection.id))
  }

  componentWillUnmount() {
    let { dispatch } = this.props
    dispatch(fetchBluprints())
  }

  render() {
    const { collection, bluprints, context } = this.props
    const { items } = bluprints

    if (!items.length)  {
      return <div>There are no Bluprints for <em>{collection.label}</em></div>
    }

    const breadcrumbFragments = [
      { label: 'Home', linkTo: '/' },
      { label: collection.label }
    ]

    let bluprintCards = _.map(items, (bluprint)=>
      <BluprintCard
        bluprint={bluprint}
        collectionId={collection.id}
        key={bluprint.id}
      />
    )

    return <Page>
      <TopBar context={context}>
        <Breadcrumb fragments={breadcrumbFragments} />
      </TopBar>
      <div className="BluprintCard-container">{bluprintCards}</div>
    </Page>
  }
}

function mapStateToProps({router, collections, bluprints, context}) {
  const {collectionId} = router.params
  const collection = _.find(collections.items, {id: collectionId})

  return {collection, bluprints, context}
}

export default connect(mapStateToProps)(Collection)
