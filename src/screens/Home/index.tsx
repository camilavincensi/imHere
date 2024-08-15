import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from './styles';
import {Participant} from "../../components/Participant";
import {useState} from "react";

export function Home() {

    const [participants, setParticipants] = useState<String[]>([])

    const [participantName, setParticipantName] = useState('')

    function handleParticipantAdd() {

        if(participants.includes(participantName)) {
           return  Alert.alert("Novo Participante", "Já existe participante com esse nome");
        }

        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) {



        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: "Sim",
                onPress: () => setParticipants(prevState => prevState.filter(p => p !== name))
            },
            {
                text: "Cancelar",
                style: "cancel",
            }

        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>
            <Text style={styles.eventDate}>
                Sexta , 4 de novembro de 2022.
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder={"Nome do participante"}
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}/>
                )}
                ListEmptyComponent={
                    <Text style={styles.lisEmptyText}>Ninguém chegou ai evento ainda? Adicione um participante!</Text>
                }
            />


        </View>

    )
}
