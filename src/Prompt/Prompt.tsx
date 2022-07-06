import React, {useState} from 'react';
import {ContainerStyles} from '../styles/ContainerStyles';
import {
  Modal,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextStyles} from '../styles/TextStyles';
import {PromptStyles} from './PromptStyles';
import {IModalComponent} from '../interfaces/IModalComponent';
import {Cancel} from '../consts/Translations';

type omit = 'message' | 'messageTextStyle';

interface PromptProps extends Omit<IModalComponent, omit> {
  onSubmit: (value: string) => void;
  description?: string;
  descriptionTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
}

const Prompt = ({
  visibilityState: [visible, setVisibility],
  onSubmit,
  title,
  description,
  language = 'EN',
  placeholder,
  titleTextStyle,
  descriptionTextStyle,
  buttonTextStyle,
  animationType,
  backgroundOpacity,
}: PromptProps) => {
  const [input, setInput] = useState('');
  const hide = () => {
    setInput('');
    setVisibility(false);
  };
  const submit = () => {
    hide();
    onSubmit(input);
  };

  return !visible ? null : (
    <Modal transparent={true} animationType={animationType || 'fade'}>
      <TouchableOpacity
        onPressIn={hide}
        style={ContainerStyles.modal(backgroundOpacity)}>
        <TouchableWithoutFeedback>
          <View style={[PromptStyles.container, ContainerStyles.shadow]}>
            <View style={PromptStyles.content}>
              <Text style={[TextStyles.header, titleTextStyle]}>{title}</Text>
              {description && (
                <Text style={[TextStyles.basic, descriptionTextStyle]}>
                  {description}
                </Text>
              )}
              <View style={PromptStyles.textInputContainer}>
                <TextInput
                  style={PromptStyles.textInput}
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={submit}
                  placeholder={placeholder}
                  autoFocus={true}
                />
              </View>
            </View>
            <View style={PromptStyles.buttonsContainer}>
              <TouchableOpacity
                onPress={hide}
                style={[PromptStyles.button, PromptStyles.buttonLeft]}>
                <Text style={[TextStyles.highlight, buttonTextStyle]}>
                  {Cancel[language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submit}
                style={[PromptStyles.button, PromptStyles.buttonRight]}>
                <Text style={[TextStyles.highlight, buttonTextStyle]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default Prompt;
