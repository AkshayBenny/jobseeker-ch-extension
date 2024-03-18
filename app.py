import json
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import nltk
nltk.download('punkt')
text_to_summarize = ""
sentence_count = 0
json_data = open("data.json")
parsed_json_data = json.load(json_data)
for sentence in parsed_json_data.items():
    text_to_summarize = text_to_summarize + " " + str(sentence[1])
    sentence_count += 1

# Input text to be summarized

# Parse the input text
parser = PlaintextParser.from_string(text_to_summarize, Tokenizer("english"))

# Create an LSA summarizer
summarizer = LsaSummarizer()

# Generate the summary
# You can adjust the number of sentences in the summary
summary = summarizer(parser.document, sentences_count=10)

# Output the summary
for sentence in summary:
    print(sentence)
