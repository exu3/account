import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@codeday/topo/Atom/Box';
import Button from '@codeday/topo/Atom/Button';
import FormControl, { Label } from '@codeday/topo/Atom/Form';
import Tooltip from '@codeday/topo/Atom/Tooltip';
import Popover, { PopoverTrigger, PopoverArrow, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody } from '@codeday/topo/Atom/Popover';


function areEqual(newProps, prevProps) {
  if (JSON.stringify(newProps.user.badges) == JSON.stringify(prevProps.user.badges)) {
    return true
  }
  return false
}

const Badges = React.memo(({ user, onChange }) => {
  const [badges, setBadgeDisplayed] = useReducer((previousBadges, { id, displayed, order }) => {
    if (displayed) {
      previousBadges.map((badge) => {
        if (badge.order == order) { badge.displayed = false; badge.order = null }
        if (badge.id == id) { badge.displayed = true; badge.order = order; }
      })
      return previousBadges || []
    } else {
      previousBadges.map((badge) => {
        if (badge.id == id) { badge.displayed = false; badge.order = null; }
      })
      const newDisplayedBadges = previousBadges.filter((b) => b.displayed == true).sort((a, b) => a.order - b.order)
      newDisplayedBadges.map((badge, index) => { badge.order = index })
      return [...previousBadges.filter((b) => b.displayed == false), ...newDisplayedBadges] || []
    }
  }, user.badges || []);
  const displayedBadges = badges.filter((b) => b.displayed == true).sort((a, b) => a.order - b.order) || []
  const badgesAlphabetical = [...badges].sort((a, b) => a.id.localeCompare(b.id))


  return (
    <FormControl>
      <Label fontWeight="bold">Which badges would you like to be displayed?</Label>
      <Grid templateColumns="repeat(3, 1fr)" gap="5px" width="fit-content">
        {displayedBadges.map((displayedBadge, index) => (displayedBadge.displayed ?
          <Popover>
            <PopoverTrigger>
              <Button width="18" textShadow="0 0 1px white, -1px -1px 1px white, -1px 1px 1px white, 1px 1px 1px white, 1px -1px 1px white">{displayedBadge.details.emoji}</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pick a badge to display!</PopoverHeader>
              <PopoverBody>
                <Grid templateColumns="repeat(5, 1fr)" gap="1px" width="fit-content">
                  {badgesAlphabetical.map((badge) => (
                    <Badge badge={badge} disabled={badge.displayed ? true : false} key={badge.id} onClick={() => {
                      setBadgeDisplayed({ id: badge.id, displayed: true, order: index })
                      onChange({ badges })
                    }} />
                  ))}
                  <Badge badge={null} disabled={false} key="none" onClick={() => {
                    setBadgeDisplayed({ id: displayedBadge.id, displayed: false, order: index })
                    onChange({ badges })
                  }} />
                </Grid>
              </PopoverBody>
            </PopoverContent>
          </Popover> : null
        ))}
        {displayedBadges.length < 3 &&
          <Popover>
            <PopoverTrigger>
              <Button width="18">❌</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pick a badge to display!</PopoverHeader>
              <PopoverBody>
                <Grid templateColumns="repeat(5, 1fr)" gap="1px" width="fit-content" alignItems="center">
                  {badgesAlphabetical.map((badge) => (
                    <Badge badge={badge} disabled={badge.displayed ? true : false} key={badge.id} onClick={() => {
                      setBadgeDisplayed({ id: badge.id, displayed: true, order: displayedBadges.length })
                      onChange({ badges })
                    }} />
                  ))}
                  <Badge badge={null} disabled={true} key="none" onClick={() => {
                    setBadgeDisplayed({ id: displayedBadge.id, displayed: false, order: displayedBadges.length })
                    onChange({ badges })
                  }} />
                </Grid>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        }
      </Grid>
    </FormControl>
  );
}, areEqual)

Badges.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Badges.provides = 'badges';

const Badge = ({ badge, disabled, onClick, onChange }) => {
  return (
    <Tooltip isDisabled={disabled ? true : false} label={badge ? badge.details.name : "none"} placement="auto" fontSize="md">
      <Button
        width="18"
        disabled={disabled ? true : false}
        onClick={onClick}
        onChange={onChange}
        textShadow="0 0 1px white, -1px -1px 1px white, -1px 1px 1px white, 1px 1px 1px white, 1px -1px 1px white">
        {badge ? badge.details.emoji : "❌"}
      </Button>
    </Tooltip>
  );
}

export default Badges;

// export default React.memo(Badges, areEqual);
// export default React.memo(Badges);