import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { HalfPixelBorder } from '../components/Border';
import constants from '../constants';

const Button = styled(HalfPixelBorder.withComponent('button'))`
  height: 32px;
  width: 100px;
  text-align: center;
  outline: none;
  background: white;
  margin-right: 10px;
`;

const Image = styled.img`
  display: block;
  height: 120px;
`;
const Text = styled.div`
  font-size: 16px;
  margin-top: 12px;
`;
export default function Demo() {
  const [url, setUrl] = useState('');
  const [err, setErr] = useState<Error | null>(null);

  const fetchClick = useCallback(() => {
    setUrl('');
    setErr(null);
    fetch(
      'https://avatars0.githubusercontent.com/u/11312811?s=400&u=cbca243cac6474b2eafd74879cb907cce14d6597&v=4'
    )
      .then(async (res) => {
        const blob = await res.blob();
        setUrl(URL.createObjectURL(blob));
      })
      .catch((error) => {
        setErr(error);
      });
  }, []);

  const ajaxClick = useCallback(() => {
    setUrl('');
    setErr(null);

    const xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      'https://avatars0.githubusercontent.com/u/11312811?s=400&u=cbca243cac6474b2eafd74879cb907cce14d6597&v=4'
    );
    xhr.responseType = 'blob';
    xhr.onload = () => {
      setUrl(URL.createObjectURL(xhr.response));
    };
    xhr.onerror = () => {
      setErr(new Error('fail to request'));
    };
    xhr.send();
  }, []);
  return (
    <div>
      <Button borderColor={constants.BORDER_COLOR} onClick={fetchClick}>
        fetch
      </Button>
      <Button borderColor={constants.BORDER_COLOR} onClick={ajaxClick}>
        ajax
      </Button>
      {url && <Image src={url} alt="" />}
      <Text>{err?.message}</Text>
    </div>
  );
}
