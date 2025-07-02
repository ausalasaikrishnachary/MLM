import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import "./Faqs.css"

const faqs = [
  {
    question: "What is Tokenised ownership?",
    answer:
      "Tokenised ownership in real estate describes an investment process wherein a number of investors join together to invest in a real estate asset so that all of them can benefit from a share of the income that the asset generates and any appreciation in the value of the property.",
  },
  {
    question: "What is OneShrirajrealtech app?",
    answer:
      "Think of OneShrirajrealtech like Binance, but for real-world assets. While it's different from crypto, it uses the same trusted blockchain technology for transparency and security. Instead of crypto tokens, OneShrirajrealtech lets you invest in tokens that represent real assets. In simple terms, [Company Name] is a tokenization platform that allows fractional ownership of top rental properties starting at just ₹ 43,894.",
  },
  {
    question: "Is OneShrirajrealtech regulated?",
    answer:
      "OneShrirajrealtech is regulated under Qatar Digital Assets regulations and operates with full compliance to ensure transparency, security, and trust in all tokenized real estate investments.",
  },
  {
    question: "How do I sign up for an account on OneShrirajrealtech?",
    answer:
      "To sign up for OneShrirajrealtech, you’ll need to provide personal information and documents like your passport and proof of address. This ensures compliance with KYC regulations under Qatar Digital Assets guidelines.",
  },
  {
    question:
      "What is the minimum amount I can invest in OneShrirajrealtech?",
    answer:
      "The minimum investment amount is ₹ 43,894. This allows investors to own fractional shares in top rental properties.",
  },
  {
    question: "How does OneShrirajrealtech work?",
    answer: "OneShrirajrealtech lets you invest in real-world assets like rental properties by owning tokens representing fractional ownership. You can invest from as low as ₹ 43,894.",
  },
];

const FAQAccordion = () => {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <Typography className="faqs-title" variant="h4" align="center" fontWeight="bold" gutterBottom>
        Have a question?
      </Typography>
      <Typography className="faqs-description" align="center" sx={{mb:3}}>
        Common questions you may have, providing clear and concise information to help you understand.
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={() => handleChange(index)}
          className="faqs-accordion"
        >
          <AccordionSummary
            expandIcon={expanded === index ? <CloseIcon /> : <ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            className="faqs-summary"
          >
            <Typography
              className="faqs-question"
              sx={{
                fontSize: isMobile ? "20px" : "24px",
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faqs-details">
            <Typography className="faqs-answer">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQAccordion;
