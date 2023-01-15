export const cleanseEvent = ({start, end, id, resource, title}) => ({start: new Date(start), end: new Date(end), id, resourceId: resource, title});
export const cleanseResource = ({ id, title, location }) => ({ resourceId: id, resourceTitle: title, locationId: location })