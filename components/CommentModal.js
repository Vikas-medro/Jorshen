import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CommentModal = ({ visible, onClose }) => {
    const insets = useSafeAreaInsets();
    // Dynamic bottom offset: at least 15px above the safe-area bottom edge
    const inputBottom = Math.max(insets.bottom, 15);
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null); // stores { id, name }
    const [comments, setComments] = useState([
        {
            id: '1',
            name: 'Alex Linderson',
            time: '2 min ago',
            text: "It's good to see this conversation gaining attention. Ethical technology is the need of the hour.",
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            likes: 3,
            replies: [
                {
                    id: '1-1',
                    name: 'Sarah Connor',
                    time: '1 min ago',
                    text: "@Alex Linderson I completely agree! We need more focus on this.",
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    likes: 2,
                }
            ]
        },
        {
            id: '2',
            name: 'Sarah Connor',
            time: '5 min ago',
            text: "I completely agree! We need more focus on this.",
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            likes: 12,
            replies: []
        },
        {
            id: '3',
            name: 'James Wilson',
            time: '1 hour ago',
            text: "Great article. Looking forward to reading more on this topic.",
            avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
            likes: 8,
            replies: []
        },
    ]);

    const handlePostComment = () => {
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            name: 'You', // Representing the current user
            time: 'Just now',
            text: commentText.trim(),
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            likes: 0,
            replies: [],
        };

        if (replyingTo) {
            // Add to the nested replies array
            const updatedComments = comments.map(c => {
                if (c.id === replyingTo.id) {
                    return { ...c, replies: [...(c.replies || []), newComment] };
                }
                return c;
            });
            setComments(updatedComments);
            setReplyingTo(null);
        } else {
            // Add to top level
            setComments([newComment, ...comments]);
        }

        setCommentText(''); // Clear input after posting
    };

    const handleReply = (commentId, name) => {
        setReplyingTo({ id: commentId, name });
        setCommentText(`@${name} `);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.modalOverlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={insets.bottom}
            >
                {/* Touch outside to close */}
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBackdrop} />
                </TouchableWithoutFeedback>

                <View style={[styles.bottomSheet, { paddingBottom: inputBottom }]}>
                    {/* Drag Handle */}
                    <View style={styles.dragHandle} />

                    {/* Header */}
                    <View style={styles.commentHeader}>
                        <Text style={styles.commentTitle}>Comments ({comments.length + 39})</Text>
                    </View>

                    {/* Close Button X (optional top right, mirroring design structure) */}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Comments List */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.commentScroll}>
                        {comments.map((comment) => (
                            <View key={comment.id}>
                                {/* Parent Comment */}
                                <View style={styles.commentItem}>
                                    <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />

                                    <View style={styles.commentBody}>
                                        <View style={styles.commentObjHeader}>
                                            <Text style={styles.commentName}>{comment.name}</Text>
                                            <Text style={styles.commentTime}>{comment.time}</Text>
                                        </View>

                                        <Text style={styles.commentText}>{comment.text}</Text>

                                        {/* Reply & Notification Badge */}
                                        <View style={styles.commentFooter}>
                                            <TouchableOpacity
                                                style={styles.replyButton}
                                                onPress={() => handleReply(comment.id, comment.name)}
                                            >
                                                <Text style={styles.replyText}>reply</Text>
                                            </TouchableOpacity>

                                            {comment.likes > 0 && (
                                                <View style={styles.notificationBadge}>
                                                    <Text style={styles.notificationText}>{comment.likes}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {/* Nested Replies */}
                                {comment.replies && comment.replies.map((reply) => (
                                    <View key={reply.id} style={[styles.commentItem, styles.replyItem]}>
                                        <Image source={{ uri: reply.avatar }} style={styles.commentAvatarSmall} />

                                        <View style={styles.commentBody}>
                                            <View style={styles.commentObjHeader}>
                                                <Text style={styles.commentName}>{reply.name}</Text>
                                                <Text style={styles.commentTime}>{reply.time}</Text>
                                            </View>

                                            <Text style={styles.commentText}>{reply.text}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}

                        <View style={{ height: 100 }} />
                    </ScrollView>

                    {/* Input Section */}
                    <View style={[styles.commentInputWrapper, { bottom: inputBottom }]}>

                        {/* Replying To Banner */}
                        {replyingTo && (
                            <View style={styles.replyBannerWrapper}>
                                <Text style={styles.replyBannerText}>Replying to <Text style={{ fontWeight: 'bold' }}>{replyingTo.name}</Text></Text>
                                <TouchableOpacity onPress={() => { setReplyingTo(null); setCommentText(''); }}>
                                    <Ionicons name="close-circle" size={18} color="#999" />
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.commentInputBar}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                                style={styles.myAvatar}
                            />
                            <TextInput
                                placeholder="Write a comment..."
                                placeholderTextColor="#999"
                                style={styles.commentInput}
                                value={commentText}
                                onChangeText={setCommentText}
                            />
                            <TouchableOpacity
                                style={[styles.postButton, !commentText.trim() && { backgroundColor: '#a5b4fc' }]}
                                onPress={handlePostComment}
                                disabled={!commentText.trim()}
                            >
                                <Text style={styles.postButtonText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CommentModal;

const styles = StyleSheet.create({
    /* ─── MODAL STYLES ─── */
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: '70%',

        paddingTop: 15,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    commentHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    closeBtn: {
        position: 'absolute',
        right: 20,
        top: -30,
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    commentScroll: {
        paddingHorizontal: 25,
        paddingTop: 10,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    commentAvatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 15,
    },
    commentBody: {
        flex: 1,
    },
    commentObjHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    commentName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    commentTime: {
        fontSize: 12,
        color: '#9ca3af',
    },
    commentText: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginBottom: 10,
    },
    commentFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    replyButton: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    replyText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '600',
    },
    //notificationBadge: {
    //  backgroundColor: '#ef4444',
    //  width: 18,
    //  height: 18,
    //  borderRadius: 9,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    //},
    notificationText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    commentInputWrapper: {
        position: 'absolute',
        left: 20,
        right: 20,
        // bottom is set dynamically via style prop using insets
    },
    commentInputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 35,
        padding: 8,
        borderWidth: 1,
        borderColor: '#e0e7ff',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    myAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#c7d2fe',
    },
    commentInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    postButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    postButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    replyItem: {
        marginLeft: 40,
        marginTop: -10,
    },
    commentAvatarSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    replyBannerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginHorizontal: 10,
        marginBottom: -15, // Slide it down behind the input bar
        paddingBottom: 20,
        zIndex: -1,
    },
    replyBannerText: {
        fontSize: 12,
        color: '#666',
    },
});
