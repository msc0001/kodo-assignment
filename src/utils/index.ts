export interface AppLocationI {
  path: string;
  query: string;
  params: any;
}

export const getUrlSearchParams = (normalisedParamString): AppLocationI => {
  const [ path, query ] = normalisedParamString.split('?');
  const params = {};

  if (query) {
    const keyAndParams: Array<string> = query.split('&');

    keyAndParams.forEach(
      keyAndParam => {
        const [key, value] = keyAndParam.split('=');
        params[key] = value;
      }
    );
  }

  return {path, query, params};
}

export const createQueryString = (params: any = {}) => {
  let queryString = '';
  Object
    .entries(params)
    .forEach(([key, value], index) =>
    queryString = `${queryString}${index !== 0 ? '&' : ''}${key}=${value}`
      );

  return queryString;
}

enum SortTypes {
  string,
  date
}

export const sortConfig = [
  {
    key: 'title',
    type: SortTypes.string,
    // order: 'asc' // can not change as not implemented
  },
  {
    key: 'dateLastEdited',
    type: SortTypes.date,
    // order: 'desc' //
  }
];

export const sortItems = (itemsToSort: Array<any>, sortOption: any) => {
  switch(sortOption.type) {
    case SortTypes.string: {
      return itemsToSort.sort((item1, item2) => item1[sortOption.key] < item2[sortOption.key] ? 1 : -1)
    }

    case SortTypes.date: {
      return itemsToSort.sort((item1, item2) => {
        const date1 = new Date(item1[sortOption.key]);
        const date2 = new Date(item2[sortOption.key]);

        return date1>date2 ? -1 : 1
      });
    }

    default: {
      return itemsToSort;
    }
  }
}

export const filterByMatchedQuery = (itemsToFilter: Array<any>, query: string) => {
  console.log('matching query', query)
  return itemsToFilter.filter((d, i) => i<40);
}
