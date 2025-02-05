// Packages Imports
import { useEffect, useState } from 'react';

type FetchFunction<ResourceType, Params> = (
  limit: number,
  offset: number,
  params?: Params
) => Promise<{ ok: boolean; data: Array<ResourceType>; has_more: boolean }>;

type ApiConfig<Params> = {
  limit: number;
  offset: number;
  params?: Params;
  has_more?: boolean;
};

const DEFAULT_PAGINATION_DETAILS: ApiConfig<any> = {
  has_more: true,
  limit: 10,
  offset: 0,
  params: {}
};

export default function useInfiniteScroll<ResourceType = any, Params = any>(
  fetchFunction: FetchFunction<ResourceType, Params>,
  apiConfigs: ApiConfig<any> = DEFAULT_PAGINATION_DETAILS,
  initialCallEnabled = true,
  initialData: Array<ResourceType> = []
) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Array<ResourceType>>(initialData);
  const [paginationDetails, setPaginationDetails] = useState<ApiConfig<Params>>(apiConfigs);

  useEffect(() => {
    setPaginationDetails(apiConfigs);
  }, [JSON.stringify(apiConfigs)]);

  useEffect(() => {
    if (initialCallEnabled) getData();
  }, []);

  const getData = async () => {
    try {
      if (isFetching) return;

      if (!paginationDetails.has_more) return;

      const { limit, offset, params } = paginationDetails;

      setIsFetching(true);
      const apiResponse = await fetchFunction(limit, offset, params);
      setIsFetching(false);

      if (apiResponse.ok) {
        setData([...data, ...apiResponse.data]);

        setPaginationDetails({
          ...paginationDetails,
          offset: offset + limit,
          has_more: apiResponse.has_more
        });
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

  return { isFetching, data, getData };
}
