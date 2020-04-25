import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from '@codeday/topo/Image';
import Spinner from '@codeday/topo/Spinner';
import FormControl, { Label, HelpText } from '@codeday/topo/FormControl';

const uploadPicture = async (files) => {
  const formData = new FormData();

  Array.from(files)
    .forEach((file, i) => {
      formData.append(i, file);
    });

  // eslint-disable-next-line no-undef
  return fetch(`/api/pic-upload`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
};

const Picture = ({ user, onChange }) => {
  const uploaderRef = useRef(null);
  const [pictureUrl, setPictureUrl] = useState(user.picture);
  const [uploading, setUploading] = useState(false);

  return (
    <FormControl>
      <Label fontWeight="bold">Show us what you look like!</Label>
      {uploading
        ? (
          <Spinner />
        ) : (
          <>
            <Image
              src={pictureUrl}
              rounded="full"
              size="100px"
              onClick={() => uploaderRef.current.click()}
            />
            <input
              type="file"
              ref={uploaderRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={async (e) => {
                setUploading(true);
                try {
                  const result = await uploadPicture(e.target.files);
                  setPictureUrl(result.url);
                  onChange({ picture: result.url });
                } catch (err) {
                  console.error(err);
                  setUploading(false);
                }
                setUploading(false);
              }}
            />
          </>
        )}
      <HelpText>Upload a picture of yourself if you&apos;d like. Max 2MB, and it will be cropped to a square.</HelpText>
    </FormControl>
  );
};
Picture.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Picture.provides = 'picture';
export default Picture;
