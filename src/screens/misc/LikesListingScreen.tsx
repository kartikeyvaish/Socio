// Packages Imports (from node_modules)
import { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';

// Local Imports (components/types/utils)
import Container from '../../components/Container';
import LoadMore from '../../components/LoadMore';
import postsApi from '../../api/posts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import UserListCard from '../../components/UserListCard';

// Named Imports
import { AppScreenProps } from '../../navigation/types';
import { User } from '../../types/model';

// interface for LikesListingScreen component
export interface LikesListingScreenProps {}

async function getLikes(post_id: number, limit: number, offset: number) {
  try {
    const apiResponse = await postsApi.getLikesOnPost(post_id, limit, offset);

    if (apiResponse.ok) {
      return { ok: true, data: apiResponse.data.likes, has_more: apiResponse.data.has_more };
    } else {
      return { ok: false, data: [], has_more: false };
    }
  } catch (error) {
    return { ok: false, data: [], has_more: false };
  }
}

function keyExtractor(item: User) {
  return item.id?.toString();
}

// functional component for LikesListingScreen
function LikesListingScreen(props: AppScreenProps<'LikesListingScreen'>) {
  // Destructuring props
  const { route } = props;

  const { post_id } = route.params || {};

  const { data, getData, isFetching } = useInfiniteScroll((limit, offset) =>
    getLikes(post_id, limit, offset)
  );

  const renderItem = useCallback(({ item }: { item: User }) => <UserListCard {...item} />, []);

  // render
  return (
    <Container flex={1}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() =>
          isFetching && data.length !== 0 ? <LoadMore label="Fetching Likes..." /> : null
        }
      />
    </Container>
  );
}

// exports
export default LikesListingScreen;

// styles for LikesListingScreen
const styles = StyleSheet.create({
  container: {}
});
