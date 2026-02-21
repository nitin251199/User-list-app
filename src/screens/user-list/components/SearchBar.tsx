import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
  onChange: (text: string) => void;
};

const SearchBar = React.memo(({ onChange }: SearchBarProps) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder='Search Users by name'
      />
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

const styles = StyleSheet.create({
  inputBox: {
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    overflow: 'hidden',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
