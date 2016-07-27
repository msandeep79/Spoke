import React from 'react'
import { List, ListItem } from 'material-ui/List'
import moment from 'moment'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import HappyIcon from 'material-ui/svg-icons/social/mood'
import { withRouter } from 'react-router'
import theme from '../styles/theme'

const inlineStyles = {
  past: {
    opacity: 0.6
  },
  warn: {
    color: theme.colors.orange
  },
  good: {
    color: theme.colors.green
  }
}

class CampaignList extends React.Component {
  renderRow(campaign) {
    const isPast = moment(campaign.dueBy).diff(moment()) < 0
    const isStarted = campaign.isStarted

    let listItemStyle = {}
    let leftIcon = ''
    if (!isStarted) {
      listItemStyle = inlineStyles.warn
      leftIcon = <WarningIcon />
    } else if (isPast) {
      listItemStyle = inlineStyles.past
    } else {
      leftIcon = <HappyIcon />
      listItemStyle = inlineStyles.good
    }

    const dueByMoment = moment(campaign.dueBy)
    const secondaryText = !isStarted ?
      'NOT STARTED: No texters assigned. You need to finish creating this campaign' : (
      <span>
        <span>
          {campaign.description}
          <br />
          {dueByMoment.isValid() ?
           dueByMoment.format('MMM D, YYYY') :
           'No due date set'}
        </span>
      </span>
    )

    const campaignUrl = `/admin/${this.props.organizationId}/campaigns/${campaign.id}`
    return (
      <ListItem
        style={listItemStyle}
        key={campaign.id}
        primaryText={`${campaign.title}`}
        onTouchTap={() => !isStarted ?
          this.props.router.push(`${campaignUrl}/edit`) :
          this.props.router.push(campaignUrl)}
        secondaryText={secondaryText}
        leftIcon={leftIcon}
      />
    )
  }

  render() {
    const { campaigns } = this.props
    return campaigns.length === 0 ? '' : (
      <List>
        {campaigns.map((campaign) => this.renderRow(campaign))}
      </List>
    )
  }
}

CampaignList.propTypes = {
  campaigns: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      dueBy: React.PropTypes.string,
      title: React.PropTypes.string,
      description: React.PropTypes.string,
      assignments: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string
      }))
    })
  ),
  router: React.PropTypes.object,
  organizationId: React.PropTypes.string
}

export default withRouter(CampaignList)