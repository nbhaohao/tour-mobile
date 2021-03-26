import React, { useEffect, useState } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import * as RCForm from 'rc-form';
import { FormComponentProps } from 'rc-form';
import { useStoreHook } from 'think-react-store';

const { createForm } = RCForm;

interface UserImageFile {
  url: string;
  file?: {
    size: number;
  };
}

interface EditProps {}

const index: React.FC<EditProps & FormComponentProps> = (props) => {
  const {
    form: { getFieldProps, validateFields, setFieldsValue },
  } = props;
  const [files, setFiles] = useState<Array<UserImageFile>>([]);
  const {
    user: { editUserAsync, getUserAsync, avatar, phone, sign, id },
  } = useStoreHook();
  useEffect(() => {
    getUserAsync();
  }, []);
  useEffect(() => {
    if (id) {
      setFieldsValue(
        {
          phone: phone || '',
          sign: sign || '',
        },
        () => {},
      );
      if (avatar) {
        setFiles([{ url: avatar }]);
      }
    }
  }, [id, setFieldsValue, setFiles]);
  const maxSize = 0.1;
  const handleChange = (files: Array<UserImageFile>) => {
    if (files[0].file) {
      if (files[0].file.size / 1024 / 1024 > maxSize) {
        Toast.fail(`图片大小不能大于${maxSize}M`);
        return;
      }
    }
    setFiles(files);
  };
  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    void validateFields((error, values: any) => {
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      }
      editUserAsync({
        avatar: files[0].url,
        phone: values.phone,
        sign: values.sign,
      });
    });
  };
  return (
    <div className="user-edit">
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('phone', {
            rules: [{ required: true }],
            initialValue: '',
          })}
          placeholder="电话"
        >
          电话：
        </InputItem>
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: '签名',
          })}
          placeholder="签名"
        >
          签名：
        </InputItem>
      </List>
      <Button type="warning" style={{ marginTop: 20 }} onClick={handleSubmit}>
        修改
      </Button>
    </div>
  );
};

export default createForm<EditProps>()(index);
