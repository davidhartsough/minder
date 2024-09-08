import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function NewListLink() {
  return (
    <Link
      href="/new"
      style={{
        borderRadius: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 24,
        elevation: 0,
        backgroundColor: Colors.primary,
        alignSelf: "center",
        fontWeight: "bold",
        letterSpacing: 0.25,
        textAlign: "center",
        fontSize: 16,
        color: "#fff",
      }}
      selectable={false}
    >
      Create New List
    </Link>
  );
}
