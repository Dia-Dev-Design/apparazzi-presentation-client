import AllTags from "../components/AllTags";
import TagFilter from "../components/TagFilter";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TagDetails = () => {
  const [allTags, setAllTags] = useState(true);

  const { id } = useParams()

  const setSeeFilter = useCallback(() => {
    setAllTags(prev => !prev);
  }, [setAllTags]);

  const setSeeAll = useCallback(() => {
    setAllTags((prev => !prev));
  }, [setAllTags]);

  useEffect(() => {
    setAllTags(true)
  }, [id])

  return (
    <>
      {allTags ? (
        <AllTags allTags={allTags} paramsId={id}>
          <button onClick={setSeeFilter} >See journey through time...</button>
        </AllTags>
      ) : (
        <TagFilter allTags={allTags} setAllTags={setAllTags} paramsId={id}>
          <button onClick={setSeeAll} >See all locations...</button>
        </TagFilter>
      )}
    </>
  );
};

export default TagDetails;

