import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineHeart, AiFillHeart, AiFillLike, AiFillDislike } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import { generateUsername } from "unique-username-generator";
import { nanoid } from "nanoid";
import { DateTime } from "luxon";
import { loremIpsum } from "lorem-ipsum";
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";

export default function Home() {
  const [liked, setLiked] = useState(true);
  const [addCommentVal, setAddCommentVal] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [sendCommentValue, setSendCommentValue] = useState("");

  const iconSize = 18;

  let subtitle;

  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => (subtitle.style.color = "#f00");
  const closeModal = () => setIsOpen(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      commentName: loremIpsum(),
      commentUser: generateUsername(),
      avatar: getRandomAvatar(),
      voteUP: 12,
      voteDOWN: 3,
      voteType: "",
      commentDate: 1668711119421,
      showCommentSection: false,
      altComments: [
        {
          id: 1,
          commentName: loremIpsum(),
          commentUser: generateUsername(),
          avatar: getRandomAvatar(),
          voteUP: 3,
          voteDOWN: 0,
          voteType: "",
          commentDate: 1668718119421,
        },
      ],
    },
    {
      id: 2,
      commentName: loremIpsum(),
      commentUser: generateUsername(),
      voteUP: 4,
      avatar: getRandomAvatar(),
      voteDOWN: 1,
      voteType: "",
      commentDate: 1668715719421,
      altComments: [
        {
          id: 1,
          commentName: loremIpsum(),
          commentUser: generateUsername(),
          avatar: getRandomAvatar(),
          voteUP: 1,
          voteDOWN: 1,
          commentDate: 1668719019472,
          voteType: "",
        },
        {
          id: 2,
          commentName: loremIpsum(),
          commentUser: generateUsername(),
          voteUP: 2,
          voteDOWN: 0,
          commentDate: 1668719214472,
          avatar: getRandomAvatar(),
          voteType: "",
        },
      ],
    },
  ]);

  const showCommentSend = (item) => {
    setComments(
      comments.map((t) => {
        if (t.id === item.id) return { ...t, showCommentSection: !item.showCommentSection };
        else return { ...t, showCommentSection: false };
      })
    );
  };

  const addComment = () => {
    setComments([
      ...comments,
      {
        id: nanoid(),
        commentName: addCommentVal,
        commentUser: generateUsername(),
        voteUP: 0,
        commentDate: Date.now(),
        avatar: getRandomAvatar(),
        voteDOWN: 0,
        voteType: "",
        showCommentSection: false,
        altComments: [],
      },
    ]);
    setAddCommentVal("");
  };

  const voteAction = (item, vote) => {
    setComments(
      comments.map((t) => {
        if (t.id === item.id)
          return {
            ...t,
            voteType: vote,
            voteDOWN:
              vote !== t.voteType
                ? vote === "down"
                  ? vote === "down"
                    ? t.voteDOWN + 1
                    : t.voteDOWN
                  : t.voteType === ""
                  ? t.voteDOWN
                  : t.voteDOWN - 1
                : t.voteDOWN,
            voteUP: vote !== t.voteType ? (vote === "up" ? (vote === "up" ? t.voteUP + 1 : t.voteUP) : t.voteType === "" ? t.voteUP : t.voteUP - 1) : t.voteUP,
          };
        else return { ...t };
      })
    );
  };

  const sendCommentAction = (comment) => {
    let items = comments.slice();
    let currentItem = items.find((c) => c.id == comment.id);
    currentItem?.altComments?.push({
      id: nanoid(),
      commentName: sendCommentValue,
      commentUser: generateUsername(),
      avatar: getRandomAvatar(),
      voteUP: 0,
      voteDOWN: 0,
      voteType: "",
      commentDate: Date.now(),
    });

    const index = items.findIndex((object) => {
      return object.id === currentItem?.id;
    });

    items[index] = currentItem;
    items[index].showCommentSection = false;
    setComments(items);
    setSendCommentValue("");
  };

  const altVoteAction = (comment, item, vote) => {
    setComments((s) =>
      s.map((c) => {
        if (c.id === comment.id) {
          c.altComments = c.altComments.map((alt) => {
            if (alt.id === item.id) {
              return Object.assign({}, alt, {
                voteType: vote,
                voteDOWN:
                  vote !== alt.voteType
                    ? vote === "down"
                      ? vote === "down"
                        ? alt.voteDOWN + 1
                        : alt.voteDOWN
                      : alt.voteType === ""
                      ? alt.voteDOWN
                      : alt.voteDOWN - 1
                    : alt.voteDOWN,
                voteUP:
                  vote !== alt.voteType
                    ? vote === "up"
                      ? vote === "up"
                        ? alt.voteUP + 1
                        : alt.voteUP
                      : alt.voteType === ""
                      ? alt.voteUP
                      : alt.voteUP - 1
                    : alt.voteUP,
              });
            }
            return alt;
          });
          return c;
        }
        return c;
      })
    );
  };

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content homepage-content">
        <div className="homepage-posts">
          <div className="homepage-post">
            <div className="homepage-post-header">
              <AiOutlineUser color="white" size={24} />
              <FiSettings color="white" size={20} />
            </div>
            <div className="homepage-post-image">
              <Image
                src="https://images.unsplash.com/photo-1664575599730-0814817939de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                layout="fill"
                alt=""
              />
            </div>
            <div className="homepage-post-action-icons">
              <button className="like-button" onClick={() => (liked ? setLiked(false) : setLiked(true))}>
                {liked ? <AiFillHeart size={22} color="red" /> : <AiOutlineHeart size={22} color="white" />}
              </button>
              <p>127 likes</p>
            </div>
            <div className="homepage-post-user">
              <p className="user-text">
                <Link href="/">
                  <b>kubilaykaya</b>
                </Link>
                <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
              </p>
              <button className="view-all-comments">View all 16 comments</button>
              <p className="post-date">9 days ago</p>
            </div>
            <button onClick={openModal} className="open-modal-button">
              Add Comment
            </button>
            <Modal
              ariaHideApp={false}
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Comments</h2>
              <div className="comments">
                {comments &&
                  comments.map((comment) => (
                    <div key={comment?.id}>
                      <div className="comment-section">
                        <div className="comment">
                          <div className="comment-info">
                            <p className="comment-text">{comment?.commentName} </p>
                            <div className="comment-user">
                              <Image src={`data:image/svg+xml;base64,${btoa(comment.avatar)}`} alt="" width={24} height={24} />
                              <span className="username">{comment?.commentUser}</span>
                              <span className="time">{DateTime.fromMillis(comment?.commentDate).toRelative()}</span>
                              {/* <span className="time">{comment?.commentDate}</span> */}
                              <button className="answer" onClick={() => showCommentSend(comment)}>
                                Yanıtla
                              </button>
                            </div>
                          </div>
                          <div className="comment-upvotes">
                            <button className={`up ${comment?.voteType === "up" ? "active" : ""}`} onClick={() => voteAction(comment, "up")}>
                              <AiFillLike color="#000" size={iconSize} />
                              <span>{comment.voteUP}</span>
                            </button>
                            <button className={`down ${comment?.voteType === "down" ? "active" : ""}`} onClick={() => voteAction(comment, "down")}>
                              <AiFillDislike color="#000" size={iconSize} />
                              <span>{comment.voteDOWN}</span>
                            </button>
                          </div>
                        </div>
                        {comment?.showCommentSection && (
                          <div className="send-comment">
                            <textarea
                              cols="30"
                              rows="2"
                              placeholder="Comment..."
                              value={sendCommentValue}
                              onChange={(e) => setSendCommentValue(e.target.value)}
                            ></textarea>
                            <button onClick={() => sendCommentAction(comment)}>Send</button>
                          </div>
                        )}
                      </div>
                      {comment?.altComments?.map((altComment) => (
                        <div className="comment-section" key={altComment?.id}>
                          <div className="comment two-level">
                            <div className="comment-info">
                              <p className="comment-text">{altComment?.commentName}</p>
                              <div className="comment-user">
                                <Image src={`data:image/svg+xml;base64,${btoa(comment.avatar)}`} alt="" width={24} height={24} />
                                <span className="username">{altComment?.commentUser}</span>
                                {altComment && <span className="time">{DateTime.fromMillis(altComment?.commentDate).toRelative()}</span>}
                                {/* {altComment && <span className="time">{altComment?.commentDate}</span>} */}
                              </div>
                            </div>
                            <div className="comment-upvotes">
                              <button
                                className={`up ${altComment?.voteType === "up" ? "active" : ""}`}
                                onClick={() => altVoteAction(comment, altComment, "up")}
                              >
                                <AiFillLike color="#000" size={iconSize} />
                                <span>{altComment.voteUP}</span>
                              </button>
                              <button
                                className={`down ${altComment?.voteType === "down" ? "active" : ""}`}
                                onClick={() => altVoteAction(comment, altComment, "down")}
                              >
                                <AiFillDislike color="#000" size={iconSize} />
                                <span>{altComment.voteDOWN}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
              <div className="add-comment">
                <textarea cols="30" rows="2" placeholder="Comment..." value={addCommentVal} onChange={(e) => setAddCommentVal(e.target.value)}></textarea>
                <button onClick={() => addComment()}>Add Comment</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
