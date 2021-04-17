import { ItemI } from "src/models/item.interface";

export interface AppLocationI {
  path: string;
  query: string;
  params: any;
}

export const getUrlSearchParams = (normalisedParamString): AppLocationI => {
  const [ path, query ] = normalisedParamString.split('?');
  let params = {};

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
    key: 'Title',
    value: 'name',
    type: SortTypes.string,
    // order: 'asc' // can not change as not implemented
  },
  {
    key: 'Date Last Edited',
    value: 'dateLastEdited',
    type: SortTypes.date,
    // order: 'desc' //
  }
];

export const sortItems = (itemsToSort: Array<any>, sortOption: any) => {
  if (itemsToSort.length <= 1) return itemsToSort;
  switch(sortOption.type) {
    case SortTypes.string: {
      return itemsToSort.sort((item1, item2) =>
        item1[sortOption.value] > item2[sortOption.value] ? 1 : -1
        );
    }

    case SortTypes.date: {
      return itemsToSort.sort((item1, item2) => {
        const date1 = new Date(item1[sortOption.value]);
        const date2 = new Date(item2[sortOption.value]);
        return date1 > date2 ? -1 : 1;
      });
    }

    default: {
      return itemsToSort;
    }
  }
}

export const filterByMatchedQuery = (itemsToFilter: Array<any>, query: string) => {
  let isExactMatch = false;

  const [pre, mid] = query.split('"');
  if (mid) {
    isExactMatch = true;
    query = mid;
  }

  return itemsToFilter.filter((itemData: ItemI) => {
    const { name, description } = itemData;

    const check = (matchString: string) => {
      const regex = new RegExp(matchString, 'gi')
      let matchedArray = regex.exec(name);
      if (matchedArray && matchedArray.length>0) return true;

      matchedArray = regex.exec(description);
      if (matchedArray && matchedArray.length>0) return true;

      return false;
    }

    if (isExactMatch) {
      return check(query);
    }

    return query
      .split(" ")
      .map(matchString => check(matchString))
      .some(value => value);
  });
}
