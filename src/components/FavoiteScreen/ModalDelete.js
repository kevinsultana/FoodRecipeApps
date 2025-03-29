import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function ModalDelete({
  modalVisible,
  onRequestClose,
  confirmDelete,
}) {
  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <Pressable style={styles.modalOverlay} onPress={onRequestClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete this recipe from your favorites?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onRequestClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={confirmDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: wp(3),
    padding: hp(2),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: 'black',
  },
  modalMessage: {
    fontSize: hp(2),
    textAlign: 'center',
    marginBottom: hp(4),
    color: 'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: hp(1),
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});
