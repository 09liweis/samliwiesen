const blogs = (state = [],action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.blogs;
    default:
      return state;
  }
}
export default blogs;