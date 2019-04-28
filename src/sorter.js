const  sorter = (key, order='asc') =>{
    return (a, b) => {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const A = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const B = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else if (A < B) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  export default  sorter;