import * as React from 'react';
import toProperCase from 'lodash.startcase';

import Card from '../shared/Card';
import { IEvent } from '../types/environment';
import JSONViewer from '../shared/JSONViewer';

type EventDetailCardProps = {
  event: IEvent
}
 
const EventDetailCard: React.SFC<EventDetailCardProps> = ({ event }) => {
  return <Card title={toProperCase(event.name)}>
    <JSONViewer value={event.context?.data}></JSONViewer>
  </Card>;
}
 
export default EventDetailCard;