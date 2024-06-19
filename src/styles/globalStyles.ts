import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 14,
  },

  button: {
    minHeight: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 6
  },

  section: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})