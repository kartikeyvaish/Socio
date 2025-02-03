// Packages Imports (from node_modules)
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';

// Local Imports (components/types/utils)
import AppText from '../components/AppText';
import colorPallete from '../constants/colorPallete';
import CommentItem from '../components/CommentItem';
import ContentLoader from '../components/ContentLoader';
import Flex from '../components/Flex';
import Icon from '../components/Icon';
import postsApi from '../api/posts';

// Named Imports
import { ChildrenProps } from '../types/global';
import { Comment } from '../types/model';
import { CommentsContext } from '../contexts/CommentsDetailsContext';
import { fontFamilies } from '../constants/ui';
import { InputProps } from '../types/components';
import { useAppSelector } from '../store/storeHooks';

// interface for CommentsDetailsProvider component
export interface CommentsDetailsProviderProps extends ChildrenProps {}

function stopEventPropagation(event: any) {
  event.stopPropagation();
  event.preventDefault();
}

// functional component for CommentsDetailsProvider
function CommentsDetailsProvider(props: CommentsDetailsProviderProps) {
  // Destructuring props
  const { children } = props;

  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [commentInput, setCommentInput] = useState('');
  const [sendCommentLoading, setSendCommentLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCommentsApi();
  }, [currentPostId]);

  const safeAreaInsets = useSafeAreaInsets();

  const { user } = useAppSelector((state) => state.auth);
  const { dark, colors } = useAppSelector((state) => state.theme);

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['80%'], []);

  const isSheetVisible = useMemo(() => currentPostId !== null, [currentPostId]);

  const getCommentsApi = async () => {
    try {
      if (!currentPostId) return;

      setLoading(true);
      const apiResponse = await postsApi.getComments(currentPostId);
      setLoading(false);

      if (apiResponse.ok) {
        setComments(apiResponse.data.comments);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const showCommentsView = useCallback((post_id: number) => {
    setCurrentPostId(post_id);
  }, []);

  const closeCommentsView = useCallback(() => {
    sheetRef.current?.close();
    setCurrentPostId(null);
    handleClosePress();
    resetStates();
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const onSheetIndexChange = useCallback((index: number) => {
    if (index === -1) {
      setCurrentPostId(null);
      resetStates();
    }
  }, []);

  const commentOnPost = async () => {
    try {
      if (!commentInput.trim()) return;

      Keyboard.dismiss();

      setSendCommentLoading(true);
      const apiResponse = await postsApi.commentOnPost(currentPostId, { comment: commentInput });
      await getCommentsApi();
      setSendCommentLoading(false);

      if (apiResponse.ok) setCommentInput('');
    } catch (error) {
      setSendCommentLoading(true);
    }
  };

  const textInputStyles: InputProps['style'] = {
    color: colors.text
  };

  const resetStates = () => {
    setCommentInput('');
    setSendCommentLoading(false);
    setLoading(false);
    setComments([]);
  };

  // render
  return (
    <CommentsContext.Provider value={{ closeCommentsView, showCommentsView, isSheetVisible }}>
      {children}

      {currentPostId ? (
        <Pressable style={styles.sheetWrapper} onPress={() => sheetRef.current?.close()}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            backgroundStyle={{
              backgroundColor: dark ? colorPallete.darkModeBlack : colorPallete.white,
              flex: 1
            }}
            handleStyle={{
              backgroundColor: dark ? colorPallete.darkModeBlack : colorPallete.white,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24
            }}
            handleIndicatorStyle={{
              backgroundColor: colors.text
            }}
            onClose={closeCommentsView}
            enablePanDownToClose={true}
            onChange={onSheetIndexChange}
          >
            <Pressable onPress={stopEventPropagation} style={{ flex: 1 }}>
              <AppText
                text="Comments"
                family={fontFamilies.Inter.bold}
                size={16}
                style={{ textAlign: 'center' }}
              />

              <Flex flex={1}>
                {comments.length === 0 && loading ? (
                  <ContentLoader loadingText="Fetching Comments..." />
                ) : comments.length === 0 && !loading ? (
                  <Flex flex={1} justify="center" align="center">
                    <AppText text="No Comments" />
                  </Flex>
                ) : (
                  <BottomSheetFlatList
                    data={comments}
                    keyExtractor={(i, index) => index.toString()}
                    renderItem={({ item }) => <CommentItem {...item} />}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </Flex>

              <Flex
                row
                gap={8}
                margins={{ right: 8, left: 8 }}
                style={{ paddingBottom: safeAreaInsets.bottom }}
              >
                <Image
                  source={{ uri: user?.profile_picture }}
                  style={{ width: 45, height: 45, borderRadius: 23 }}
                />

                <Flex flex={1}>
                  <BottomSheetTextInput
                    style={[styles.input, textInputStyles]}
                    placeholder="Write a comment"
                    onChangeText={setCommentInput}
                    value={commentInput}
                    placeholderTextColor={colors.text}
                  />

                  {commentInput.length ? (
                    <Animated.View
                      style={styles.sendIconContainer}
                      entering={ZoomIn}
                      exiting={ZoomOut}
                    >
                      <Pressable
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={commentOnPost}
                      >
                        <Icon
                          family="AntDesign"
                          name="arrowup"
                          size={24}
                          color={colorPallete.white}
                          loading={sendCommentLoading}
                        />
                      </Pressable>
                    </Animated.View>
                  ) : null}
                </Flex>
              </Flex>
            </Pressable>
          </BottomSheet>
        </Pressable>
      ) : null}
    </CommentsContext.Provider>
  );
}

// exports
export default CommentsDetailsProvider;

// styles for CommentsDetailsProvider
const styles = StyleSheet.create({
  container: {},
  sheetWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingLeft: 15,
    paddingRight: 15
  },
  sendIconContainer: {
    backgroundColor: colorPallete.primary,
    position: 'absolute',
    top: 3.5,
    right: 3.5,
    height: 38,
    width: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
