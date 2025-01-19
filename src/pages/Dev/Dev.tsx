import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { FlexBox } from '@/components/styled';
import { Image, VisuallyHiddenInput } from '@/components/styled';

import api from './api';
import type { ServerIconUpload } from './models';

async function UploadTempImage({ fileBlob }: { fileBlob: string }): Promise<string> {
  const image_temp_url = await api.upload_temp_image(fileBlob);

  return image_temp_url;
}

function UploadImage() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    trigger,
    setValue,

    formState: { errors },
  } = useForm<ServerIconUpload>({
    defaultValues: { image: undefined },
    mode: 'onChange',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(getValues('image') || null); // Blob URL
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const fileBlobURL = URL.createObjectURL(selectedFile);
    const serverSideImageName = await UploadTempImage({
      fileBlob: fileBlobURL,
    });
    console.log(`serverSideImageName : ${serverSideImageName}`);
    setImagePreview(serverSideImageName || null);
    setValue('image', serverSideImageName);
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        minWidth: 600,
        height: '100%',
        backgroundColor: 'rgba(244,244,244, 0.4)',
        borderRadius: 2,
        border: errors?.image ? '2px solid #d32f2f' : '1px solid black',
      }}
    >
      {imagePreview && <Image src={imagePreview} sx={{ objectFit: 'contain' }} />}
      <FlexBox>
        <Button
          variant="outlined"
          disabled={!!imagePreview}
          startIcon={<FileUploadOutlined />}
          component={'label'}
          size="small"
        >
          Upload Image
          <VisuallyHiddenInput
            // ref={ref}
            name={'input_server_icon'}
            // onBlur={onBlur}
            type="file"
            accept=".png, .webp, .svg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              // onChange(e.target.files?.[0]);
              handleUploadClick(e);
              // trigger('imageURL');
            }}
          />
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function Home() {
  const onClick = async () => {
    await api.devAPI('/test');
  };
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: 3,
          rowGap: 2,
        }}
      >
        Dev page
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Button onClick={onClick} variant="outlined">
            api dev test
          </Button>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <UploadImage />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
